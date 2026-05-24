# Bellman-Ford Algorithm

<iframe src="/infographic/searching/bellman_ford_interactive_infographic.html" width="100%" height="540" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Bellman-Ford Interactive Visualization"></iframe>

## Function Code

```java
public static int[] bellmanFord(int[][] edges, int V, int source) {
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[source] = 0;

    // Relax all edges V-1 times
    for (int i = 0; i < V - 1; i++) {
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    // Detect negative weight cycles
    for (int[] edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
            System.out.println("Negative weight cycle detected!");
            return null;
        }
    }

    return dist;
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static int[] bellmanFord(int[][] edges, int V, int source)` | Takes edge list `[u, v, weight]`, vertex count, and source. Returns shortest distances. |
| 2-3 | `int[] dist = new int[V]; Arrays.fill(dist, Integer.MAX_VALUE)` | Initialize all distances to ∞. |
| 4 | `dist[source] = 0` | Distance to self is 0. |
| 7 | `for (int i = 0; i < V - 1; i++)` | Outer loop: repeat V-1 times. Shortest path has at most V-1 edges. |
| 8 | `for (int[] edge : edges)` | Inner loop: try relaxing every edge. |
| 9 | `int u = edge[0], v = edge[1], w = edge[2]` | Extract source, destination, and weight. |
| 10 | `if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v])` | Can we reach v cheaper through u? Guard against overflow. |
| 11 | `dist[v] = dist[u] + w` | Relaxation: update shortest known distance to v. |
| 17-22 | Negative cycle detection | If ANY edge can still be relaxed after V-1 iterations, a negative cycle exists. |

## How It Works (Edge Relaxation)

```
Edges: (0→1, 4), (0→2, 5), (1→2, -3), (2→3, 4), (1→3, 6)
Vertices: 4, Source: 0

Iteration 1 (relax all edges):
  Edge 0→1: dist[1] = min(∞, 0+4) = 4
  Edge 0→2: dist[2] = min(∞, 0+5) = 5
  Edge 1→2: dist[2] = min(5, 4+(-3)) = 1  ← negative edge helps!
  Edge 2→3: dist[3] = min(∞, 1+4) = 5
  Edge 1→3: dist[3] = min(5, 4+6) = 5     ← no improvement
  dist = [0, 4, 1, 5]

Iteration 2 (relax all edges again):
  No changes → already optimal

Iteration 3: No changes

Negative cycle check: No edge can be further relaxed → No negative cycle ✅

Final: dist = [0, 4, 1, 5]
```

## Full Program

```java
package Searching;

import java.util.*;

class BellmanFordSearch {
    public static void main(String[] args) {
        // edges[i] = {source, destination, weight}
        int[][] edges = {
            {0, 1, 4},
            {0, 2, 5},
            {1, 2, -3},
            {2, 3, 4},
            {1, 3, 6}
        };
        int V = 4;
        int source = 0;

        int[] distances = bellmanFord(edges, V, source);

        if (distances != null) {
            System.out.println("Shortest distances from node " + source + ":");
            for (int i = 0; i < distances.length; i++) {
                String d = distances[i] == Integer.MAX_VALUE ? "∞" : String.valueOf(distances[i]);
                System.out.println("  To node " + i + ": " + d);
            }
        }
    }

    public static int[] bellmanFord(int[][] edges, int V, int source) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[source] = 0;

        for (int i = 0; i < V - 1; i++) {
            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                System.out.println("Negative weight cycle detected!");
                return null;
            }
        }

        return dist;
    }
}
```

## Dry Run

```
Input: edges = [(0→1,4), (0→2,5), (1→2,-3), (2→3,4), (1→3,6)], V=4, source=0

Initialization:
  dist = [0, ∞, ∞, ∞]

Iteration 1 (i=0):
  Edge (0,1,4):  dist[0]=0 ≠ ∞, 0+4=4 < ∞   → dist[1] = 4
  Edge (0,2,5):  dist[0]=0 ≠ ∞, 0+5=5 < ∞   → dist[2] = 5
  Edge (1,2,-3): dist[1]=4 ≠ ∞, 4+(-3)=1 < 5 → dist[2] = 1
  Edge (2,3,4):  dist[2]=1 ≠ ∞, 1+4=5 < ∞    → dist[3] = 5
  Edge (1,3,6):  dist[1]=4 ≠ ∞, 4+6=10 > 5   → no change
  dist = [0, 4, 1, 5]

Iteration 2 (i=1):
  Edge (0,1,4):  0+4=4, not < 4  → no change
  Edge (0,2,5):  0+5=5, not < 1  → no change
  Edge (1,2,-3): 4+(-3)=1, not < 1 → no change
  Edge (2,3,4):  1+4=5, not < 5  → no change
  Edge (1,3,6):  4+6=10, not < 5 → no change
  No changes → converged early

Iteration 3 (i=2): No changes

Negative cycle check:
  All 5 edges: none can be relaxed further → NO negative cycle

Output: dist = [0, 4, 1, 5]
```

## Complexity Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity** | O(V × E) |
| **Space Complexity** | O(V) |
| **Best Case** | O(E) -converges in one iteration |
| **Worst Case** | O(V × E) -longest shortest path uses V-1 edges |
| **Negative cycle detection** | Additional O(E) pass |

## When to Use

| Scenario | Recommendation |
|----------|---------------|
| Graph with negative edge weights | ✅ Bellman-Ford |
| Detecting negative weight cycles | ✅ Bellman-Ford |
| Distributed/network routing (RIP) | ✅ Bellman-Ford |
| Dense graph, non-negative weights | Dijkstra is faster |
| Sparse graph, non-negative weights | Dijkstra is faster |
| All-pairs shortest path | Floyd-Warshall |

## Key Interview Points

1. **Handles negative weights**: Unlike Dijkstra, works correctly with negative edge weights
2. **Detects negative cycles**: Extra V-th iteration check -if anything relaxes, cycle exists
3. **V-1 iterations**: Shortest path can have at most V-1 edges, so V-1 relaxation rounds suffice
4. **Slower than Dijkstra**: O(VE) vs O((V+E)log V) -trade-off for handling negatives
5. **Edge list representation**: Doesn't need adjacency matrix/list -just iterate all edges
6. **Early termination**: If no edge relaxes in an iteration, algorithm can stop early
7. **SPFA optimization**: Queue-based variant that's faster in practice (avg case)
