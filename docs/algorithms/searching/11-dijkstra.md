# Dijkstra's Algorithm

<iframe src="/infographic/searching/dijkstra_interactive_infographic.html" width="100%" height="540" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Dijkstra Interactive Visualization"></iframe>

## Function Code

```java
public static int[] dijkstra(int[][] graph, int source) {
    int n = graph.length;
    int[] dist = new int[n];
    boolean[] visited = new boolean[n];

    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[source] = 0;

    // Min-heap: [distance, node]
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{0, source});

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];

        if (visited[u]) continue;
        visited[u] = true;

        for (int v = 0; v < n; v++) {
            if (graph[u][v] != 0 && !visited[v]) {
                int newDist = dist[u] + graph[u][v];
                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    pq.offer(new int[]{newDist, v});
                }
            }
        }
    }
    return dist;
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static int[] dijkstra(int[][] graph, int source)` | Takes adjacency matrix and source node. Returns shortest distance to all nodes. |
| 2-3 | `int[] dist = new int[n]; boolean[] visited = ...` | `dist[i]` = shortest known distance from source to i. `visited[i]` = finalized or not. |
| 5-6 | `Arrays.fill(dist, Integer.MAX_VALUE); dist[source] = 0` | All distances start at ∞ except source which is 0. |
| 9 | `PriorityQueue<int[]> pq` | Min-heap ensures we always process the closest unfinalized node. |
| 10 | `pq.offer(new int[]{0, source})` | Seed the queue with source at distance 0. |
| 13 | `int[] curr = pq.poll()` | Extract node with smallest tentative distance. |
| 14 | `int d = curr[0], u = curr[1]` | `d` = distance, `u` = node index. |
| 16-17 | `if (visited[u]) continue; visited[u] = true` | Skip stale entries. Once visited, distance is finalized (greedy property). |
| 19-20 | `for (int v = 0; v < n; v++) if (graph[u][v] != 0 && !visited[v])` | Check all unvisited neighbors of u. |
| 21 | `int newDist = dist[u] + graph[u][v]` | Relaxation: can we reach v cheaper through u? |
| 22-24 | `if (newDist < dist[v])` | Yes -update distance and add to priority queue. |

## How It Works (Greedy Relaxation)

```
Graph (adjacency matrix, 0 = no edge):
     0   1   2   3   4
0 [  0,  4,  0,  0,  0 ]
1 [  4,  0,  8,  0,  0 ]
2 [  0,  8,  0,  7,  0 ]
3 [  0,  0,  7,  0,  9 ]
4 [  0,  0,  0,  9,  0 ]

Source: 0

Step 1: Visit 0 (dist=0)
  Update: dist[1] = 4
  PQ: [(4,1)]

Step 2: Visit 1 (dist=4)
  Update: dist[2] = 4+8 = 12
  PQ: [(12,2)]

Step 3: Visit 2 (dist=12)
  Update: dist[3] = 12+7 = 19
  PQ: [(19,3)]

Step 4: Visit 3 (dist=19)
  Update: dist[4] = 19+9 = 28
  PQ: [(28,4)]

Step 5: Visit 4 (dist=28)
  No unvisited neighbors.

Final: dist = [0, 4, 12, 19, 28]
```

## Full Program

```java
package Searching;

import java.util.*;

class DijkstraSearch {
    public static void main(String[] args) {
        int[][] graph = {
            {0, 4, 0, 0, 0},
            {4, 0, 8, 0, 0},
            {0, 8, 0, 7, 0},
            {0, 0, 7, 0, 9},
            {0, 0, 0, 9, 0}
        };

        int source = 0;
        int[] distances = dijkstra(graph, source);

        System.out.println("Shortest distances from node " + source + ":");
        for (int i = 0; i < distances.length; i++) {
            System.out.println("  To node " + i + ": " + distances[i]);
        }
    }

    public static int[] dijkstra(int[][] graph, int source) {
        int n = graph.length;
        int[] dist = new int[n];
        boolean[] visited = new boolean[n];

        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[source] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, source});

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int d = curr[0], u = curr[1];

            if (visited[u]) continue;
            visited[u] = true;

            for (int v = 0; v < n; v++) {
                if (graph[u][v] != 0 && !visited[v]) {
                    int newDist = dist[u] + graph[u][v];
                    if (newDist < dist[v]) {
                        dist[v] = newDist;
                        pq.offer(new int[]{newDist, v});
                    }
                }
            }
        }
        return dist;
    }
}
```

## Dry Run

```
Input: graph (5 nodes), source = 0

Initialization:
  dist = [0, ∞, ∞, ∞, ∞]
  visited = [F, F, F, F, F]
  PQ = [(0, 0)]

Iteration 1: Poll (0, 0)
  visited[0] = true
  Neighbor 1: graph[0][1]=4, newDist=0+4=4 < ∞ → dist[1]=4
  PQ = [(4, 1)]
  dist = [0, 4, ∞, ∞, ∞]

Iteration 2: Poll (4, 1)
  visited[1] = true
  Neighbor 0: visited, skip
  Neighbor 2: graph[1][2]=8, newDist=4+8=12 < ∞ → dist[2]=12
  PQ = [(12, 2)]
  dist = [0, 4, 12, ∞, ∞]

Iteration 3: Poll (12, 2)
  visited[2] = true
  Neighbor 1: visited, skip
  Neighbor 3: graph[2][3]=7, newDist=12+7=19 < ∞ → dist[3]=19
  PQ = [(19, 3)]
  dist = [0, 4, 12, 19, ∞]

Iteration 4: Poll (19, 3)
  visited[3] = true
  Neighbor 2: visited, skip
  Neighbor 4: graph[3][4]=9, newDist=19+9=28 < ∞ → dist[4]=28
  PQ = [(28, 4)]
  dist = [0, 4, 12, 19, 28]

Iteration 5: Poll (28, 4)
  visited[4] = true
  No unvisited neighbors.
  PQ = empty → done

Output: dist = [0, 4, 12, 19, 28]
```

## Complexity Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity** | O((V + E) log V) with binary heap |
| **Space Complexity** | O(V + E) |
| **With adjacency matrix** | O(V² log V) |
| **With Fibonacci heap** | O(V log V + E) -theoretically optimal |
| **Without priority queue** | O(V²) -simpler but slower |

## When to Use

| Scenario | Recommendation |
|----------|---------------|
| Shortest path, non-negative weights | ✅ Dijkstra |
| Single-source to all destinations | ✅ Dijkstra |
| GPS / network routing | ✅ Dijkstra |
| Negative edge weights | ❌ Use Bellman-Ford |
| Unweighted graph | BFS is simpler and faster |
| Need heuristic guidance | A* is better |

## Key Interview Points

1. **Greedy algorithm**: Always finalizes the closest node -works because weights are non-negative
2. **Cannot handle negative weights**: A negative edge could make an already-finalized node cheaper
3. **Relaxation**: Core operation -checking if path through u improves distance to v
4. **Priority Queue variants**: Binary heap O((V+E)log V), Fibonacci heap O(V log V + E)
5. **Single-source shortest path**: Finds shortest paths from one node to ALL other nodes
6. **vs BFS**: Dijkstra generalizes BFS to weighted graphs (BFS = Dijkstra with all weights = 1)
7. **vs A***: A* adds heuristic to guide search toward specific target; Dijkstra finds all shortest paths
