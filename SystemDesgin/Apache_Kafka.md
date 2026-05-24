# Apache Kafka

**Date:** 5/24/2026

---

## Core Synthesis

### **Core Message**

Apache Kafka is a **distributed event streaming platform** designed for high-throughput, fault-tolerant, real-time data pipelines. It is not just a message queue -it's a **durable, append-only commit log** that decouples producers from consumers, enables event replay, and serves as the backbone for event-driven architectures at scale.

The fundamental insight: Kafka treats data as a **stream of immutable events** rather than ephemeral messages to be consumed and discarded. This changes how entire systems are architected -from request/response to event sourcing, CQRS, and real-time analytics.

---

### **Architecture Overview**

```
┌──────────────────────────────────────────────────────┐
│                    Kafka Cluster                       │
│                                                       │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐              │
│  │ Broker 1│  │ Broker 2│  │ Broker 3│              │
│  │         │  │         │  │         │              │
│  │ Part 0  │  │ Part 1  │  │ Part 2  │  ← Topic A  │
│  │ Part 1R │  │ Part 0R │  │ Part 1R │  ← Replicas │
│  └─────────┘  └─────────┘  └─────────┘              │
│                                                       │
│            ┌──────────────────┐                       │
│            │   ZooKeeper /    │                       │
│            │   KRaft (new)    │                       │
│            └──────────────────┘                       │
└──────────────────────────────────────────────────────┘

Producers ──→ [Topic: Partitions] ──→ Consumer Groups
```

---

### **Key Concepts**

| Concept | Definition |
|---------|-----------|
| **Topic** | A named feed/category of records. Think of it as a table in a database. |
| **Partition** | An ordered, immutable sequence of records within a topic. Enables parallelism. |
| **Offset** | Sequential ID for each record within a partition. Consumers track their position. |
| **Broker** | A single Kafka server. A cluster has multiple brokers. |
| **Producer** | Publishes records to topics. Decides which partition via key or round-robin. |
| **Consumer** | Reads records from topics. Part of a consumer group for load balancing. |
| **Consumer Group** | Multiple consumers sharing a subscription. Each partition assigned to exactly one consumer in the group. |
| **Replication Factor** | Number of copies of each partition across brokers. Default: 3. |
| **Leader/Follower** | Each partition has one leader (handles reads/writes) and N-1 followers (replicate). |

---

### **How Kafka Achieves High Throughput**

1. **Sequential I/O**: Writes append to end of log file -sequential disk writes are as fast as RAM. No random seeks.
2. **Zero-copy transfer**: Data sent from disk to network socket without copying through application memory (uses `sendfile()` syscall).
3. **Batching**: Producers batch multiple records into single network requests. Consumers fetch in batches.
4. **Compression**: Records compressed in batches (snappy, lz4, gzip, zstd) -less network and disk I/O.
5. **Page cache**: Kafka leverages OS page cache aggressively -hot data served from memory without JVM heap pressure.
6. **Partitioning**: Each partition processed independently -linear horizontal scaling.

---

### **Partitioning Strategy**

```
Topic: "orders" with 6 partitions

Producer sends record with key = "user-123"
  → hash("user-123") % 6 = partition 3
  → All records for user-123 go to partition 3 (ordering guaranteed per key)

Producer sends record with NO key
  → Round-robin across partitions (no ordering guarantee)
```

**Critical rule**: Ordering is guaranteed ONLY within a single partition, not across partitions.

**Partition count decision:**
- More partitions = more parallelism = higher throughput
- But: more file handles, more memory, longer leader election on failure
- Rule of thumb: Start with `max(throughput_target / partition_throughput, num_consumers)`

---

### **Consumer Groups & Rebalancing**

```
Topic "events" -4 partitions: P0, P1, P2, P3

Consumer Group A (3 consumers):
  Consumer 1 → P0, P1
  Consumer 2 → P2
  Consumer 3 → P3

Consumer Group B (2 consumers):
  Consumer 1 → P0, P1
  Consumer 2 → P2, P3

If Consumer 2 in Group A dies:
  Rebalance → Consumer 1 → P0, P1, P2  |  Consumer 3 → P3
```

**Key rules:**
- Max useful consumers per group = number of partitions
- Each partition consumed by exactly ONE consumer in a group
- Different groups read independently (pub/sub pattern)

---

### **Replication & Fault Tolerance**

```
Replication Factor = 3, Topic with 2 partitions, 3 brokers

Broker 1: P0 (Leader),  P1 (Follower)
Broker 2: P0 (Follower), P1 (Leader)
Broker 3: P0 (Follower), P1 (Follower)

If Broker 2 dies:
  → P1 follower on Broker 1 or 3 becomes new leader
  → No data loss (ISR had caught up)
  → Producers/consumers redirect to new leader automatically
```

**ISR (In-Sync Replicas):** Followers that are fully caught up with the leader. Only ISR members can be elected leader. If ISR shrinks to just the leader, you risk data loss on leader failure.

**acks configuration (producer durability):**
| Setting | Behavior | Trade-off |
|---------|----------|-----------|
| `acks=0` | Fire and forget | Fastest, may lose data |
| `acks=1` | Leader acknowledges | Balanced -loses data if leader dies before replication |
| `acks=all` | All ISR acknowledge | Strongest durability, highest latency |

---

### **Message Delivery Semantics**

| Semantic | Guarantee | How |
|----------|-----------|-----|
| **At-most-once** | May lose messages | Commit offset before processing |
| **At-least-once** | May duplicate messages | Commit offset after processing |
| **Exactly-once** | No loss, no duplicates | Idempotent producer + transactional API + consumer `read_committed` |

**Exactly-once in practice:**
- Producer: `enable.idempotence=true` -deduplicates retries using sequence numbers
- Transactions: `beginTransaction()` → produce + commit offsets atomically → `commitTransaction()`
- Consumer: `isolation.level=read_committed` -only sees committed transactional records

---

### **Retention & Compaction**

**Time-based retention** (default):
```
retention.ms=604800000  (7 days)
→ Records older than 7 days are deleted
→ Useful for: event streams, logs, metrics
```

**Log compaction**:
```
Topic: "user-profiles" (compacted)

Offset 1: key=user1, value={name: "Alice", age: 25}
Offset 5: key=user1, value={name: "Alice", age: 26}  ← latest
Offset 3: key=user2, value={name: "Bob", age: 30}

After compaction:
Offset 5: key=user1, value={name: "Alice", age: 26}  ← kept (latest)
Offset 3: key=user2, value={name: "Bob", age: 30}    ← kept (only version)

→ Keeps latest value per key forever
→ Useful for: changelogs, materialized views, CDC
```

---

### **Common Use Cases**

| Use Case | Why Kafka |
|----------|-----------|
| **Event Sourcing** | Immutable log = natural event store. Rebuild state by replaying. |
| **Real-time Analytics** | Stream processing with Kafka Streams or Flink on live data. |
| **Log Aggregation** | Collect logs from all services → central topic → Elasticsearch/S3. |
| **Change Data Capture (CDC)** | Database changes streamed to Kafka → downstream systems react. |
| **Microservice Communication** | Async, decoupled communication. Services don't need to know about each other. |
| **Metrics & Monitoring** | High-throughput ingestion of time-series data from thousands of sources. |
| **Activity Tracking** | LinkedIn's original use case -user actions → Kafka → analytics pipeline. |

---

### **Kafka Streams (Stream Processing)**

```java
StreamsBuilder builder = new StreamsBuilder();

// Read from input topic
KStream<String, String> orders = builder.stream("orders");

// Transform: filter high-value orders
KStream<String, String> highValue = orders.filter(
    (key, value) -> extractAmount(value) > 1000
);

// Aggregate: count orders per user (stateful)
KTable<String, Long> orderCounts = orders
    .groupByKey()
    .count();

// Write results to output topic
highValue.to("high-value-orders");
orderCounts.toStream().to("order-counts");
```

**Why Kafka Streams over Spark/Flink:**
- No separate cluster needed -runs as a regular Java app
- Exactly-once semantics built-in
- Stateful processing with local state stores (RocksDB)
- Scales by adding more app instances

---

### **KRaft Mode (ZooKeeper Removal)**

**Before (ZooKeeper-based):**
- ZooKeeper managed: broker registration, leader election, topic metadata
- Separate cluster to maintain → operational overhead
- Scalability bottleneck (ZooKeeper doesn't scale well past ~200K partitions)

**After (KRaft, Kafka 3.3+):**
- Kafka manages its own metadata via Raft consensus
- Controller quorum replaces ZooKeeper
- Faster partition recovery and leader election
- Scales to millions of partitions
- Simpler deployment (no ZooKeeper cluster)

---

### **Performance Tuning Cheat Sheet**

| Goal | Configuration |
|------|--------------|
| Max throughput (producer) | `batch.size=65536`, `linger.ms=5`, `compression.type=lz4` |
| Max durability | `acks=all`, `min.insync.replicas=2`, `replication.factor=3` |
| Low latency | `linger.ms=0`, `acks=1`, fewer partitions |
| High consumer throughput | Increase partitions, match consumer count to partitions |
| Prevent data loss | `unclean.leader.election.enable=false`, `min.insync.replicas=2` |

---

### **Kafka vs Alternatives**

| Feature | Kafka | RabbitMQ | AWS SQS | Pulsar |
|---------|-------|----------|---------|--------|
| Model | Log-based | Queue-based | Queue-based | Log-based |
| Throughput | Millions/sec | Thousands/sec | Thousands/sec | Millions/sec |
| Retention | Configurable (days/forever) | Until consumed | 14 days max | Tiered (hot/cold) |
| Replay | ✅ | ❌ | ❌ | ✅ |
| Ordering | Per partition | Per queue | Per group (FIFO) | Per partition |
| Managed option | Confluent, MSK | CloudAMQP | Native AWS | StreamNative |

---

### **Common Interview Questions**

1. **How does Kafka guarantee ordering?** -Per partition only. Records with same key hash to same partition. No cross-partition ordering.

2. **What happens when a broker dies?** -ISR follower becomes leader. Producers/consumers redirect. No data loss if ISR was in sync.

3. **How is Kafka different from a message queue?** -Kafka retains messages after consumption (log-based). Multiple consumer groups can read independently. Messages aren't deleted on read.

4. **How does Kafka achieve exactly-once?** -Idempotent producer (sequence numbers deduplicate retries) + transactions (atomic produce + offset commit) + read_committed consumers.

5. **When would you NOT use Kafka?** -Low-latency request/response, simple task queues with priority, small-scale apps where overhead isn't justified, when strict message ordering across all messages is needed.

6. **How to handle a slow consumer?** -Consumer lag grows. Solutions: add partitions + consumers, optimize processing, use separate consumer group for replay, implement backpressure.

7. **What is consumer lag?** -Difference between latest offset (what producer wrote) and committed offset (what consumer processed). Key metric for health monitoring.

---

### **Key Takeaways**

- **Kafka is a distributed commit log**, not just a message queue. This unlocks replay, event sourcing, and stream processing.
- **Partitioning = parallelism**. More partitions = more throughput, but with operational trade-offs.
- **Ordering is per-partition only.** Design your key strategy around what needs ordering guarantees.
- **Consumer groups enable both queue and pub/sub patterns.** One group = queue semantics. Multiple groups = pub/sub.
- **Replication factor + ISR + acks = your durability knob.** Tune based on whether you can afford to lose records.
- **Exactly-once is achievable** but requires idempotent producers + transactions + read_committed consumers.
- **KRaft replaces ZooKeeper** -simpler operations, better scalability, faster recovery.
- **Kafka shines for**: event-driven architectures, real-time analytics, CDC, log aggregation, high-throughput async communication.
