# Breadth First Search (BFS)

<iframe src="/infographic/searching/bfs_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="BFS Interactive Visualization"></iframe>

## Function Code

```java
public static void bfs(List<List<Integer>> graph, int start) {
    boolean[] visited = new boolean[graph.size()];
    Queue<Integer> queue = new LinkedList<>();
    
    visited[start] = true;
    queue.offer(start);
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void bfs(List<List<Integer>> graph, int start)` | Takes adjacency list and starting node. |
| 2 | `boolean[] visited = new boolean[graph.size()];` | Track visited nodes to prevent revisiting. |
| 3 | `Queue<Integer> queue = new LinkedList<>();` | BFS uses a **queue** (FIFO). This makes it explore level by level. |
| 5 | `visited[start] = true;` | Mark start as visited **before** adding to queue (prevents duplicates). |
| 6 | `queue.offer(start);` | Add start node to queue. |
| 8 | `while (!queue.isEmpty())` | Process until all reachable nodes are visited. |
| 9 | `int node = queue.poll();` | Take the **oldest** node in queue (FIFO → explores nearest first). |
| 10 | `System.out.print(node + " ");` | Process the node. |
| 12 | `for (int neighbor : graph.get(node))` | Explore all neighbors of current node. |
| 13 | `if (!visited[neighbor])` | Only process unvisited neighbors. |
| 14 | `visited[neighbor] = true;` | Mark visited **immediately** (not when polling). This prevents adding same node multiple times. |
| 15 | `queue.offer(neighbor);` | Add to queue for future processing. |

## BFS with Level Tracking (Most Common Interview Pattern)

```java
public static int bfsLevels(List<List<Integer>> graph, int start, int target) {
    boolean[] visited = new boolean[graph.size()];
    Queue<Integer> queue = new LinkedList<>();
    
    visited[start] = true;
    queue.offer(start);
    int level = 0;
    
    while (!queue.isEmpty()) {
        int size = queue.size();  // Nodes at current level
        
        for (int i = 0; i < size; i++) {
            int node = queue.poll();
            if (node == target) return level;
            
            for (int neighbor : graph.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        level++;  // Move to next level
    }
    
    return -1;  // Target not reachable
}
```

| Line | Explanation |
|------|-------------|
| `int size = queue.size();` | Capture how many nodes are at this level BEFORE processing. |
| `for (int i = 0; i < size; i++)` | Process exactly this level's nodes. |
| `level++;` | After processing all nodes at current level, increment depth. |

## BFS on Grid (Matrix)

```java
public static int bfsGrid(int[][] grid, int[] start, int[] target) {
    int rows = grid.length, cols = grid[0].length;
    boolean[][] visited = new boolean[rows][cols];
    Queue<int[]> queue = new LinkedList<>();
    int[][] dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};  // right, left, down, up
    
    visited[start[0]][start[1]] = true;
    queue.offer(start);
    int steps = 0;
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            int[] curr = queue.poll();
            if (curr[0] == target[0] && curr[1] == target[1]) return steps;
            
            for (int[] dir : dirs) {
                int nr = curr[0] + dir[0];
                int nc = curr[1] + dir[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols 
                    && !visited[nr][nc] && grid[nr][nc] != 0) {
                    visited[nr][nc] = true;
                    queue.offer(new int[]{nr, nc});
                }
            }
        }
        steps++;
    }
    return -1;
}
```

## Full Program

```java
package Searching;

import java.util.*;

class BFS {
    public static void main(String[] args) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < 6; i++) graph.add(new ArrayList<>());
        
        // Undirected graph
        graph.get(0).addAll(Arrays.asList(1, 2));
        graph.get(1).addAll(Arrays.asList(0, 3, 4));
        graph.get(2).addAll(Arrays.asList(0, 4));
        graph.get(3).addAll(Arrays.asList(1, 5));
        graph.get(4).addAll(Arrays.asList(1, 2, 5));
        graph.get(5).addAll(Arrays.asList(3, 4));
        
        System.out.print("BFS from 0: ");
        bfs(graph, 0);
        // Output: 0 1 2 3 4 5
    }
    
    public static void bfs(List<List<Integer>> graph, int start) {
        boolean[] visited = new boolean[graph.size()];
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");
            
            for (int neighbor : graph.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time** | O(V + E) -visits every vertex and edge once |
| **Space** | O(V) -queue can hold up to V nodes (widest level) |

## When to Use BFS

| Problem Type | Why BFS |
|--------------|---------|
| **Shortest path (unweighted)** | BFS guarantees shortest path by visiting level by level |
| **Level-order traversal** | BFS naturally processes nodes level by level |
| **Nearest neighbor** | Find closest node satisfying a condition |
| **Minimum steps/moves** | Each BFS level = one step |
| **Multi-source BFS** | Start from multiple sources simultaneously |

## Common Mistake

```java
// ❌ WRONG: Mark visited AFTER polling
int node = queue.poll();
visited[node] = true;  // Too late! Same node could be added multiple times

// ✅ CORRECT: Mark visited BEFORE adding to queue  
if (!visited[neighbor]) {
    visited[neighbor] = true;  // Mark NOW to prevent duplicates
    queue.offer(neighbor);
}
```

## 🖼️ Infographic Context

**For Napkin AI:** Show a graph with BFS exploring level by level -like ripples in water. Level 0: start node. Level 1: all direct neighbors. Level 2: neighbors of neighbors. Use concentric circles/rings to show the levels. Show the queue growing as nodes are discovered. Contrast with DFS which goes deep down one path.

Image path: `public/infographic/searching/bfs.png`

## Key Interview Points

- Uses **Queue** (FIFO) -explores nearest nodes first
- **Guarantees shortest path** in unweighted graphs
- Level-by-level pattern: `int size = queue.size()` before inner loop
- Mark visited **when adding to queue**, not when polling
- O(V + E) time, O(V) space
- Grid BFS: use `int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}}`
- Multi-source BFS: add all sources to queue initially (e.g., "rotten oranges")
