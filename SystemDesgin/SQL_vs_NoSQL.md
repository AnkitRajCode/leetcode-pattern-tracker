![SQL vs noSQL](/infographic/systemDesgin/sql.png)

---

## Quick Decision Framework

```
Do you need ACID transactions?          → SQL
Do you need complex joins/aggregations? → SQL
Is your schema fixed and relational?    → SQL
Do you read/write entire objects?       → NoSQL
Is your schema evolving rapidly?        → NoSQL
Do you need massive write throughput?   → NoSQL
Do you prioritize availability > consistency? → NoSQL
```

---

## Head-to-Head Comparison

| Feature | SQL (Relational) | NoSQL |
|---------|-----------------|-------|
| **Data Model** | Tables, rows, columns | Documents, key-value, wide-column, graph |
| **Schema** | Fixed, predefined (DDL) | Dynamic, flexible |
| **Relationships** | JOINs (normalized) | Embedded/denormalized |
| **Scaling** | Vertical (scale up) | Horizontal (scale out) |
| **Transactions** | ACID guaranteed | BASE (eventual consistency) |
| **Query Language** | SQL (standardized) | Database-specific APIs |
| **Consistency** | Strong consistency | Eventual consistency (tunable) |
| **Best For** | Complex queries, relationships | High throughput, flexible schema |

---

## SQL Databases

### What They Are
Relational databases store data in **tables** with predefined schemas. Every row follows the same structure. Relationships are expressed through foreign keys and resolved via JOINs.

### How They Work
```
┌─────────────────────┐       ┌──────────────────────┐
│      users          │       │       orders         │
├─────────────────────┤       ├──────────────────────┤
│ id (PK)            │◄──────│ user_id (FK)         │
│ name               │       │ id (PK)              │
│ email              │       │ product              │
│ created_at         │       │ amount               │
└─────────────────────┘       └──────────────────────┘

SELECT u.name, o.product, o.amount
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.id = 42;
```

### ACID Properties

| Property | Meaning | Example |
|----------|---------|---------|
| **Atomicity** | All or nothing | Transfer: debit AND credit both succeed, or neither does |
| **Consistency** | Data always valid | Balance can't go negative if rule exists |
| **Isolation** | Concurrent txns don't interfere | Two withdrawals don't read same balance |
| **Durability** | Committed = permanent | Power failure after commit → data survives |

### Scaling SQL (It IS possible)

| Strategy | How | Used By |
|----------|-----|---------|
| **Read replicas** | Writes → master, reads → replicas | Instagram, GitHub |
| **Sharding** | Partition data by key across DBs | Vitess (YouTube), Instagram |
| **Connection pooling** | PgBouncer, ProxySQL | Almost everyone |
| **Caching layer** | Redis/Memcached in front | Facebook, Twitter |
| **Vertical scaling** | Bigger machine | Works up to a point |

### Popular SQL Databases

| Database | Best For |
|----------|----------|
| **PostgreSQL** | General purpose, advanced features, JSON support |
| **MySQL** | Web applications, read-heavy workloads |
| **SQL Server** | Enterprise, .NET ecosystem |
| **Oracle** | Enterprise, large-scale financial systems |
| **SQLite** | Embedded, mobile, local apps |

---

## NoSQL Databases

### What They Are
Non-relational databases designed for **specific data models and access patterns**. Data stored as denormalized units -fetched and written as whole objects without expensive JOINs.

### Types of NoSQL

#### 1. Document Store (MongoDB, CouchDB)
```json
// Single document = entire entity
{
  "_id": "user_42",
  "name": "Alice",
  "email": "alice@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Seattle",
    "zip": "98101"
  },
  "orders": [
    { "product": "Laptop", "amount": 999 },
    { "product": "Mouse", "amount": 25 }
  ]
}
// One read fetches EVERYTHING -no joins needed
```

#### 2. Key-Value Store (Redis, DynamoDB)
```
key: "session:abc123"  →  value: { userId: 42, expires: "..." }
key: "cache:user:42"   →  value: { name: "Alice", ... }

// Blazing fast O(1) lookups by key
// No queries by value -you must know the key
```

#### 3. Wide-Column Store (Cassandra, HBase)
```
Row Key: "user_42"
  Column Family "profile": { name: "Alice", email: "alice@ex.com" }
  Column Family "activity": { last_login: "2026-05-24", posts: 147 }

// Each row can have different columns
// Optimized for writes and time-series data
```

#### 4. Graph Database (Neo4j, Amazon Neptune)
```
(Alice)-[:FRIENDS_WITH]->(Bob)
(Alice)-[:PURCHASED]->(Laptop)
(Bob)-[:REVIEWED]->(Laptop)

// Relationships are first-class citizens
// Traversals are O(1) per hop (not O(n) joins)
```

### BASE Properties

| Property | Meaning |
|----------|---------|
| **Basically Available** | System always responds (may not be latest data) |
| **Soft state** | State may change over time without input (replication lag) |
| **Eventually consistent** | Given enough time, all nodes converge to same value |

---

## CAP Theorem

```
        Consistency
           /\
          /  \
         /    \
        / CP   \
       /________\
      /    CA    \
     / (impossible\
    /  in dist.    \
   /    systems)    \
  /──────────────────\
Availability ──── Partition Tolerance

In a distributed system, you can only guarantee 2 out of 3.
Network partitions WILL happen → real choice is CP vs AP.
```

| Choice | Behavior During Partition | Examples |
|--------|--------------------------|----------|
| **CP** | Refuses some requests to maintain consistency | MongoDB, HBase, Redis Cluster |
| **AP** | Serves requests but may return stale data | Cassandra, DynamoDB, CouchDB |
| **CA** | Only possible on single node (no partitions) | Traditional RDBMS (single server) |

---

## How NoSQL Achieves Scale

### 1. Consistent Hashing (Data Distribution)
```
Hash Ring:
    Node A (0-90)    Node B (91-180)    Node C (181-270)    Node D (271-360)

    hash("user_42") = 157 → Node B
    hash("user_99") = 302 → Node D

Adding Node E at position 135:
    Only data in range 91-135 moves from B to E
    (minimal redistribution)
```

### 2. Replication & Quorum
```
Replication Factor = 3
Write Quorum (W) = 2
Read Quorum (R) = 2

Rule: W + R > N guarantees reading latest write

Write "Alice" to nodes 1, 2, 3:
  Node 1: ✅ acknowledged
  Node 2: ✅ acknowledged  → Write succeeds (W=2 met)
  Node 3: ⏳ replicating...

Read from nodes 1, 2, 3:
  Node 1: "Alice" (timestamp: T5)
  Node 2: "Alice" (timestamp: T5)  → Return "Alice" (R=2 met, latest timestamp)
```

### 3. Log-Structured Storage (Write Optimization)
```
Write path (Cassandra/HBase style):

Client write → Commit Log (append, sequential I/O -FAST)
           → Memtable (in-memory sorted structure)
           → [When Memtable full] → Flush to SSTable on disk (immutable)
           → [Background] → Compaction merges SSTables

Read path:
  Check Memtable → Check SSTables (newest first) → Bloom filter skips irrelevant SSTables
```

### 4. Tombstones (Delete Without Mutation)
```
Record: key="user_42", value="Alice", timestamp=T1
Delete: key="user_42", value=TOMBSTONE, timestamp=T5

Read encounters tombstone → treats record as deleted
Compaction eventually removes tombstoned records

Why? Immutable SSTables can't be modified in-place.
Tombstone propagates deletion across all replicas.
```

---

## Real-World Database Choices

| Company | Database | Why |
|---------|----------|-----|
| **YouTube** | MySQL (Vitess) | Relational data, sharded horizontally |
| **Instagram** | PostgreSQL | Started SQL, scaled with sharding |
| **WhatsApp** | Erlang + Mnesia | Custom solution, not traditional NoSQL |
| **Netflix** | Cassandra | Write-heavy, global availability |
| **Uber** | MySQL + Schemaless | Custom NoSQL layer on top of MySQL |
| **Facebook** | MySQL + TAO (cache) | SQL with custom caching layer |
| **Twitter** | Manhattan (custom) | Moved from MySQL to custom KV store |
| **Discord** | Cassandra → ScyllaDB | Messages = write-heavy, append-only |
| **Airbnb** | MySQL + DynamoDB | SQL for core, NoSQL for search/sessions |

**Key insight**: Most large companies use BOTH -SQL for core relational data, NoSQL for specific access patterns (caching, sessions, analytics).

---

## When to Choose What

### Choose SQL When:
- Data has clear relationships (users → orders → products)
- You need complex queries with JOINs, GROUP BY, aggregations
- ACID transactions are required (financial, inventory)
- Schema is relatively stable
- Team expertise is in SQL
- Data integrity is non-negotiable

### Choose NoSQL When:
- Data is naturally self-contained (user profiles, product catalogs)
- Access pattern is "fetch entire object by key"
- Write throughput is extreme (millions/sec)
- Schema changes frequently (startup iteration)
- Availability matters more than consistency
- Data is geographically distributed

### Choose BOTH When:
- Core business logic in SQL (transactions, relationships)
- Sessions/caching in Redis (key-value)
- Search in Elasticsearch (document)
- Analytics in Cassandra/ClickHouse (wide-column)
- Recommendations in Neo4j (graph)

---

## Common Interview Questions

**1. "When would you pick NoSQL over SQL?"**
> When access patterns are key-based reads/writes of denormalized objects, write throughput requirements exceed single-node capacity, schema evolves rapidly, and eventual consistency is acceptable.

**2. "Can SQL databases scale?"**
> Yes. Read replicas, sharding (Vitess, Citus), connection pooling, and caching layers allow SQL to handle billions of requests. YouTube runs on sharded MySQL.

**3. "What is eventual consistency?"**
> After a write, not all nodes have the latest value immediately. Given enough time (usually milliseconds), all replicas converge. Acceptable for social feeds, problematic for bank balances.

**4. "Explain the CAP theorem"**
> In a distributed system during a network partition, you must choose between consistency (all nodes see same data) and availability (all requests get a response). You cannot have both.

**5. "How does sharding work in NoSQL?"**
> Data is partitioned across nodes using consistent hashing on a key. Each node owns a range of the hash space. Adding nodes only moves a small subset of data.

**6. "What's the difference between horizontal and vertical scaling?"**
> Vertical = bigger machine (more RAM/CPU). Horizontal = more machines. SQL traditionally scales vertically; NoSQL is designed for horizontal scaling. But SQL can also scale horizontally with sharding.

---

## Key Takeaways

- **Access patterns drive the choice**, not scale. Map your read/write patterns before deciding.
- **SQL scales fine** with proper architecture (replicas, sharding, caching). Don't abandon it for scale alone.
- **NoSQL trades consistency for throughput/availability.** Make this trade-off consciously.
- **Most production systems use both.** SQL for transactions, NoSQL for specific workloads.
- **"Scale demands NoSQL" is a myth.** YouTube, Instagram, and WhatsApp prove SQL works at billions of requests.
- **The real question**: "Do I always read/write complete objects, or do I need relational queries?" This single question often decides the answer.
