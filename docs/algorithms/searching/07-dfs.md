# Depth First Search (DFS)

<iframe src="/infographic/searching/dfs_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="DFS Interactive Visualization"></iframe>

## Function Code (Graph - Iterative)

```java
public static void dfs(List<List<Integer>> graph, int start) {
    boolean[] visited = new boolean[graph.size()];
    Stack<Integer> stack = new Stack<>();
    
    stack.push(start);
    
    while (!stack.isEmpty()) {
        int node = stack.pop();
        
        if (visited[node]) continue;
        visited[node] = true;
        
        System.out.print(node + " ");
        
        // Push neighbors in reverse for left-to-right traversal
        List<Integer> neighbors = graph.get(node);
        for (int i = neighbors.size() - 1; i >= 0; i--) {
            if (!visited[neighbors.get(i)]) {
                stack.push(neighbors.get(i));
            }
        }
    }
}
```

## Function Code (Graph - Recursive)

```java
public static void dfsRecursive(List<List<Integer>> graph, int node, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");
    
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfsRecursive(graph, neighbor, visited);
        }
    }
}
```

## Line-by-Line Explanation (Iterative)

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void dfs(List<List<Integer>> graph, int start)` | Takes adjacency list and starting node. |
| 2 | `boolean[] visited = new boolean[graph.size()];` | Track visited nodes to avoid infinite loops in cyclic graphs. |
| 3 | `Stack<Integer> stack = new Stack<>();` | DFS uses a **stack** (LIFO). This is what makes it go "deep" first. |
| 5 | `stack.push(start);` | Begin with the starting node. |
| 7 | `while (!stack.isEmpty())` | Process until no more nodes to explore. |
| 8 | `int node = stack.pop();` | Take the most recently added node (LIFO → goes deep). |
| 10 | `if (visited[node]) continue;` | Skip already-visited nodes (handles cycles). |
| 11 | `visited[node] = true;` | Mark current node as visited. |
| 13 | `System.out.print(node + " ");` | Process the node (print, collect, etc.). |
| 16 | `for (int i = neighbors.size() - 1; i >= 0; i--)` | Push neighbors in reverse so left-most is processed first. |
| 17-18 | `if (!visited[...]) stack.push(...)` | Only push unvisited neighbors. |

## Line-by-Line Explanation (Recursive)

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `dfsRecursive(graph, node, visited)` | Process one node and recurse for its neighbors. |
| 2 | `visited[node] = true;` | Mark as visited immediately. |
| 3 | `System.out.print(node + " ");` | Process current node. |
| 5 | `for (int neighbor : graph.get(node))` | Explore all adjacent nodes. |
| 6 | `if (!visited[neighbor])` | Only visit unvisited neighbors. |
| 7 | `dfsRecursive(graph, neighbor, visited);` | Recursion = implicit stack. Goes deep before backtracking. |

## DFS on Binary Tree

```java
// Preorder DFS (Root → Left → Right)
public static void dfsTree(TreeNode root) {
    if (root == null) return;
    
    System.out.print(root.val + " ");  // Process node
    dfsTree(root.left);                 // Go deep left
    dfsTree(root.right);                // Then deep right
}
```

## Full Program

```java
package Searching;

import java.util.*;

class DFS {
    public static void main(String[] args) {
        // Create graph: 0 → [1,2], 1 → [3], 2 → [4], 3 → [], 4 → []
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < 5; i++) graph.add(new ArrayList<>());
        graph.get(0).add(1); graph.get(0).add(2);
        graph.get(1).add(3);
        graph.get(2).add(4);
        
        System.out.print("DFS Iterative: ");
        dfs(graph, 0);
        
        System.out.print("\nDFS Recursive: ");
        boolean[] visited = new boolean[5];
        dfsRecursive(graph, 0, visited);
    }
    
    public static void dfs(List<List<Integer>> graph, int start) {
        boolean[] visited = new boolean[graph.size()];
        Stack<Integer> stack = new Stack<>();
        stack.push(start);
        
        while (!stack.isEmpty()) {
            int node = stack.pop();
            if (visited[node]) continue;
            visited[node] = true;
            System.out.print(node + " ");
            
            List<Integer> neighbors = graph.get(node);
            for (int i = neighbors.size() - 1; i >= 0; i--) {
                if (!visited[neighbors.get(i)]) {
                    stack.push(neighbors.get(i));
                }
            }
        }
    }
    
    public static void dfsRecursive(List<List<Integer>> graph, int node, boolean[] visited) {
        visited[node] = true;
        System.out.print(node + " ");
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                dfsRecursive(graph, neighbor, visited);
            }
        }
    }
}
```

Output: `DFS Iterative: 0 1 3 2 4` | `DFS Recursive: 0 1 3 2 4`

## Complexity

| | Value |
|--|-------|
| **Time** | O(V + E) -visit every vertex and edge once |
| **Space** | O(V) -visited array + stack/recursion depth |

Where V = vertices, E = edges.

## DFS vs BFS

| Feature | DFS | BFS |
|---------|-----|-----|
| Data Structure | Stack (LIFO) | Queue (FIFO) |
| Traversal | Goes deep first | Goes wide first |
| Memory | O(height) | O(width) |
| Shortest Path | ❌ No guarantee | ✅ Guaranteed (unweighted) |
| Cycle Detection | ✅ Yes | ✅ Yes |
| Topological Sort | ✅ Yes | ✅ Yes (Kahn's) |
| Connected Components | ✅ Yes | ✅ Yes |

## Common DFS Patterns in Interviews

```java
// 1. Path existence
public boolean hasPath(int[][] graph, int src, int dst) { ... }

// 2. Cycle detection (directed graph)
public boolean hasCycle(int[][] graph) { ... }  // Use colors: WHITE/GRAY/BLACK

// 3. Topological Sort
public int[] topoSort(int[][] graph) { ... }    // Post-order DFS + reverse

// 4. Connected Components count
public int countComponents(int[][] graph) { ... } // DFS from each unvisited node

// 5. Grid/Matrix DFS
public void dfsGrid(int[][] grid, int r, int c) { ... } // 4 directions
```

## 🖼️ Infographic Context

**For Napkin AI:** Show a tree/graph with nodes. DFS goes deep first -show the traversal path going down one branch completely before backtracking. Use arrows numbered 1,2,3... to show visit order. Show the stack growing and shrinking. Compare visually with BFS's "level by level" approach.

Image path: `public/infographic/searching/dfs.png`

## Key Interview Points

- Uses **Stack** (explicit or recursion's implicit call stack)
- Goes as **deep** as possible before backtracking
- O(V + E) time, O(V) space
- Use for: path finding, cycle detection, topological sort, connected components
- Recursive version is cleaner but can cause **stack overflow** for deep graphs
- **Grid DFS:** treat each cell as a node with 4 neighbors (up/down/left/right)
