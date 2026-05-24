# Jump Search

<iframe src="/infographic/searching/jump_search_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Jump Search Interactive Visualization"></iframe>

## Function Code

```java
public static int jumpSearch(int[] nums, int target) {
    int n = nums.length;
    int step = (int) Math.sqrt(n);
    int prev = 0;
    
    // Jump ahead in blocks of √n
    while (nums[Math.min(step, n) - 1] < target) {
        prev = step;
        step += (int) Math.sqrt(n);
        if (prev >= n) return -1;
    }
    
    // Linear search within the block
    while (nums[prev] < target) {
        prev++;
        if (prev == Math.min(step, n)) return -1;
    }
    
    if (nums[prev] == target) return prev;
    return -1;
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static int jumpSearch(int[] nums, int target)` | Takes a **sorted** array and target. Returns index or -1. |
| 2 | `int n = nums.length;` | Store array length for reuse. |
| 3 | `int step = (int) Math.sqrt(n);` | Optimal jump size is √n. This gives O(√n) total comparisons. |
| 4 | `int prev = 0;` | Tracks start of current block (left boundary). |
| 7 | `while (nums[Math.min(step, n) - 1] < target)` | Jump forward by √n blocks. `Math.min(step, n)` prevents out-of-bounds. If last element of block < target, target is ahead. |
| 8 | `prev = step;` | Move left boundary to current step position. |
| 9 | `step += (int) Math.sqrt(n);` | Jump to next block. |
| 10 | `if (prev >= n) return -1;` | If we've jumped past the array, target doesn't exist. |
| 14 | `while (nums[prev] < target)` | Linear search forward within the identified block. |
| 15 | `prev++;` | Move one element at a time. |
| 16 | `if (prev == Math.min(step, n)) return -1;` | Reached end of block without finding target. |
| 19 | `if (nums[prev] == target) return prev;` | Check if current position has the target. |
| 20 | `return -1;` | Not found. |

## Full Program

```java
package Searching;

class JumpSearch {
    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25};
        
        int index = jumpSearch(nums, 15);
        
        if (index == -1) {
            System.out.println("Not found");
        } else {
            System.out.println("Found at index " + index);
        }
    }
    
    public static int jumpSearch(int[] nums, int target) {
        int n = nums.length;
        int step = (int) Math.sqrt(n);
        int prev = 0;
        
        while (nums[Math.min(step, n) - 1] < target) {
            prev = step;
            step += (int) Math.sqrt(n);
            if (prev >= n) return -1;
        }
        
        while (nums[prev] < target) {
            prev++;
            if (prev == Math.min(step, n)) return -1;
        }
        
        if (nums[prev] == target) return prev;
        return -1;
    }
}
```

## Dry Run

Array: `[1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25]` (n=13), Target: `15`  
Step = √13 ≈ 3

| Phase | Step | prev | Check | Action |
|-------|------|------|-------|--------|
| Jump | 3 | 0 | nums[2]=5 < 15 | Jump ahead |
| Jump | 6 | 3 | nums[5]=11 < 15 | Jump ahead |
| Jump | 9 | 6 | nums[8]=17 > 15 | Stop jumping, target in block [6..8] |
| Linear | - | 6 | nums[6]=13 < 15 | Move forward |
| Linear | - | 7 | nums[7]=15 == 15 | Found! ✅ |

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(1) -target at first jump boundary |
| **Time (Average)** | O(√n) -jump + linear within block |
| **Time (Worst)** | O(√n) -last block, linear scan through it |
| **Space** | O(1) -no extra space |

## Why √n is Optimal?

If block size = m, then:
- Jumps needed: n/m
- Linear scan within block: m
- Total: n/m + m

To minimize, take derivative and set to 0:  
`d/dm (n/m + m) = -n/m² + 1 = 0` → `m = √n`

## When to Use (vs Binary Search)

| Scenario | Use |
|----------|-----|
| Random access array | Binary Search (faster) |
| Jumping back is costly (e.g., systems) | Jump Search (only jumps forward) |
| Need simpler implementation | Jump Search |
| Sorted linked list | Jump Search (can't do random mid access) |

> **Key insight:** Jump Search only moves **forward**. Binary Search jumps both forward and backward. This matters in systems where backward traversal is expensive.

## Key Interview Points

- Works only on **sorted** arrays
- Optimal block size is **√n**
- Better than linear (O(√n) < O(n)), worse than binary (O(√n) > O(log n))
- Advantage: only moves forward -useful when backward traversal is costly
- Real-world: searching in systems with sequential access
