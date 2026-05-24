# A* Search Algorithm

<iframe src="/infographic/searching/a_star_search_interactive_infographic.html" width="100%" height="540" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="A* Search Interactive Visualization"></iframe>

## Function Code

```java
public static List<int[]> aStarSearch(int[][] grid, int[] start, int[] goal) {
    int rows = grid.length, cols = grid[0].length;
    int[][] directions = {{0,1},{0,-1},{1,0},{-1,0}};

    // Priority queue: [fScore, row, col]
    PriorityQueue<int[]> openSet = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    openSet.offer(new int[]{heuristic(start, goal), start[0], start[1]});

    Map<String, String> cameFrom = new HashMap<>();
    Map<String, Integer> gScore = new HashMap<>();
    gScore.put(key(start), 0);

    Set<String> closedSet = new HashSet<>();

    while (!openSet.isEmpty()) {
        int[] current = openSet.poll();
        int row = current[1], col = current[2];
        String currentKey = key(row, col);

        if (row == goal[0] && col == goal[1]) {
            return reconstructPath(cameFrom, goal);
        }

        if (closedSet.contains(currentKey)) continue;
        closedSet.add(currentKey);

        for (int[] dir : directions) {
            int nr = row + dir[0], nc = col + dir[1];
            String neighborKey = key(nr, nc);

            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            if (grid[nr][nc] == 1) continue; // wall
            if (closedSet.contains(neighborKey)) continue;

            int tentativeG = gScore.get(currentKey) + 1;

            if (tentativeG < gScore.getOrDefault(neighborKey, Integer.MAX_VALUE)) {
                gScore.put(neighborKey, tentativeG);
                int fScore = tentativeG + heuristic(new int[]{nr, nc}, goal);
                openSet.offer(new int[]{fScore, nr, nc});
                cameFrom.put(neighborKey, currentKey);
            }
        }
    }
    return Collections.emptyList(); // No path found
}

private static int heuristic(int[] a, int[] b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]); // Manhattan distance
}

private static String key(int[] pos) { return pos[0] + "," + pos[1]; }
private static String key(int r, int c) { return r + "," + c; }
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static List<int[]> aStarSearch(...)` | Takes a 2D grid (0=free, 1=wall), start and goal positions. Returns path as list of coordinates. |
| 2-3 | `int rows = ...; int[][] directions = ...` | Grid dimensions and 4-directional movement (right, left, down, up). |
| 6 | `PriorityQueue<int[]> openSet` | Min-heap ordered by f(n) = g(n) + h(n). Explores lowest-cost nodes first. |
| 7 | `openSet.offer(...)` | Seed with start node. Initial f = 0 + heuristic(start, goal). |
| 9 | `Map<String, String> cameFrom` | Parent map to reconstruct the shortest path. |
| 10-11 | `Map<String, Integer> gScore` | Actual cost from start to each node. Start gets g=0. |
| 13 | `Set<String> closedSet` | Already-processed nodes -never re-expand them. |
| 16-17 | `int[] current = openSet.poll()` | Extract node with lowest f-score (most promising). |
| 20-22 | `if (row == goal[0] && col == goal[1])` | Reached the goal -reconstruct and return path. |
| 24-25 | `if (closedSet.contains(...)) continue` | Skip already-processed nodes (handles duplicate entries in PQ). |
| 27-31 | `for (int[] dir : directions)` | Explore all 4 neighbors; skip out-of-bounds, walls, and closed nodes. |
| 33 | `int tentativeG = gScore.get(currentKey) + 1` | Cost to reach neighbor via current node (edge weight = 1). |
| 35-39 | `if (tentativeG < gScore.getOrDefault(...))` | Found a better path to neighbor -update g-score, compute f-score, add to PQ. |
| 45 | `return Collections.emptyList()` | Open set empty, no path exists. |
| 48 | `heuristic(...)` | Manhattan distance -admissible heuristic for grid with 4-dir movement. |

## How It Works (f = g + h)

```
Grid (0=free, 1=wall):
  [0] [0] [0] [0] [0]
  [0] [1] [1] [0] [0]
  [0] [0] [0] [0] [0]
  [0] [0] [1] [1] [0]
  [0] [0] [0] [0] [0]

Start: (0,0)  Goal: (4,4)

Key insight: f(n) = g(n) + h(n)
  g(n) = actual cost from start to n
  h(n) = estimated cost from n to goal (Manhattan distance)

A* explores FEWER nodes than BFS because heuristic guides toward goal.

Expansion order (f-score based):
  (0,0) f=0+8=8 → (1,0) f=1+6=7 → (2,0) f=2+6=8 → ...
  Guided toward bottom-right, avoids exploring top-right corner unnecessarily.

Path found: (0,0)→(1,0)→(2,0)→(2,1)→(2,2)→(2,3)→(1,3)→(1,4)→(2,4)→(3,4)→(4,4)
```

## Full Program

```java
package Searching;

import java.util.*;

class AStarSearch {
    public static void main(String[] args) {
        int[][] grid = {
            {0, 0, 0, 0, 0},
            {0, 1, 1, 0, 0},
            {0, 0, 0, 0, 0},
            {0, 0, 1, 1, 0},
            {0, 0, 0, 0, 0}
        };

        int[] start = {0, 0};
        int[] goal = {4, 4};

        List<int[]> path = aStarSearch(grid, start, goal);

        if (path.isEmpty()) {
            System.out.println("No path found");
        } else {
            System.out.println("Path:");
            for (int[] p : path) {
                System.out.println("  (" + p[0] + ", " + p[1] + ")");
            }
        }
    }

    public static List<int[]> aStarSearch(int[][] grid, int[] start, int[] goal) {
        int rows = grid.length, cols = grid[0].length;
        int[][] directions = {{0,1},{0,-1},{1,0},{-1,0}};

        PriorityQueue<int[]> openSet = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        openSet.offer(new int[]{heuristic(start, goal), start[0], start[1]});

        Map<String, String> cameFrom = new HashMap<>();
        Map<String, Integer> gScore = new HashMap<>();
        gScore.put(key(start), 0);

        Set<String> closedSet = new HashSet<>();

        while (!openSet.isEmpty()) {
            int[] current = openSet.poll();
            int row = current[1], col = current[2];
            String currentKey = key(row, col);

            if (row == goal[0] && col == goal[1]) {
                return reconstructPath(cameFrom, goal);
            }

            if (closedSet.contains(currentKey)) continue;
            closedSet.add(currentKey);

            for (int[] dir : directions) {
                int nr = row + dir[0], nc = col + dir[1];
                String neighborKey = key(nr, nc);

                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
                if (grid[nr][nc] == 1) continue;
                if (closedSet.contains(neighborKey)) continue;

                int tentativeG = gScore.get(currentKey) + 1;

                if (tentativeG < gScore.getOrDefault(neighborKey, Integer.MAX_VALUE)) {
                    gScore.put(neighborKey, tentativeG);
                    int fScore = tentativeG + heuristic(new int[]{nr, nc}, goal);
                    openSet.offer(new int[]{fScore, nr, nc});
                    cameFrom.put(neighborKey, currentKey);
                }
            }
        }
        return Collections.emptyList();
    }

    private static List<int[]> reconstructPath(Map<String, String> cameFrom, int[] goal) {
        List<int[]> path = new ArrayList<>();
        String current = key(goal);
        while (current != null) {
            String[] parts = current.split(",");
            path.add(0, new int[]{Integer.parseInt(parts[0]), Integer.parseInt(parts[1])});
            current = cameFrom.get(current);
        }
        return path;
    }

    private static int heuristic(int[] a, int[] b) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }

    private static String key(int[] pos) { return pos[0] + "," + pos[1]; }
    private static String key(int r, int c) { return r + "," + c; }
}
```

## Dry Run

```
Input: grid (5x5 with walls), start=(0,0), goal=(4,4)

Initialization:
  openSet = [(f=8, 0, 0)]
  gScore = {"0,0": 0}
  closedSet = {}

Iteration 1: Poll (0,0), f=8
  closedSet = {"0,0"}
  Neighbors: (0,1) g=1,f=1+7=8  |  (1,0) g=1,f=1+6=7
  openSet = [(7,1,0), (8,0,1)]

Iteration 2: Poll (1,0), f=7
  closedSet = {"0,0", "1,0"}
  Neighbors: (2,0) g=2,f=2+6=8
  openSet = [(8,0,1), (8,2,0)]

Iteration 3: Poll (0,1), f=8
  closedSet = {"0,0", "1,0", "0,1"}
  Neighbors: (0,2) g=2,f=2+6=8
  openSet = [(8,2,0), (8,0,2)]

... (continues expanding toward goal) ...

Final: reaches (4,4) with path length 10

Output: Path: (0,0)→(1,0)→(2,0)→(2,1)→(2,2)→(2,3)→(1,3)→(1,4)→(2,4)→(3,4)→(4,4)
```

## Complexity Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity** | O(E log V) with binary heap -depends on heuristic quality |
| **Space Complexity** | O(V) -stores all explored nodes |
| **Best Case** | O(d) -perfect heuristic, expands only nodes on optimal path |
| **Worst Case** | O(b^d) -poor heuristic degrades to BFS |
| **With perfect heuristic** | Expands minimum nodes necessary |

## When to Use

| Scenario | Recommendation |
|----------|---------------|
| Shortest path in weighted graphs | ✅ A* Search |
| Game pathfinding (grid/navmesh) | ✅ A* Search |
| GPS/maps navigation | ✅ A* Search |
| Unweighted graph shortest path | BFS is simpler |
| Negative edge weights | ❌ Use Bellman-Ford |
| No good heuristic available | Dijkstra instead |

## Key Interview Points

1. **Optimal + Complete**: A* guarantees shortest path IF heuristic is admissible (never overestimates)
2. **f(n) = g(n) + h(n)**: g = actual cost so far, h = estimated cost to goal
3. **Admissible heuristic**: h(n) ≤ actual cost. Manhattan distance is admissible for 4-direction grids
4. **Consistent heuristic**: h(n) ≤ cost(n,n') + h(n'). Ensures each node processed at most once
5. **Degenerates to Dijkstra**: When h(n) = 0 for all n
6. **Degenerates to Greedy BFS**: When g(n) is ignored
7. **Memory intensive**: Stores all explored states -variants like IDA* address this
