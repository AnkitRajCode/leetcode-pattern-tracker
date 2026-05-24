# Heap Sort

<iframe src="/infographic/sorting/heap_sort_interactive_infographic.html" width="100%" height="560" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Heap Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void heapSort(int[] nums) {
    int n = nums.length;
    
    // Build max heap (bottom-up)
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(nums, n, i);
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        swap(nums, 0, i);       // Move max to end
        heapify(nums, i, 0);    // Restore heap for remaining
    }
}

private static void heapify(int[] nums, int size, int root) {
    int largest = root;
    int left = 2 * root + 1;
    int right = 2 * root + 2;
    
    if (left < size && nums[left] > nums[largest]) {
        largest = left;
    }
    if (right < size && nums[right] > nums[largest]) {
        largest = right;
    }
    
    if (largest != root) {
        swap(nums, root, largest);
        heapify(nums, size, largest);  // Recursively fix affected subtree
    }
}

private static void swap(int[] nums, int a, int b) {
    int temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
}
```

## Line-by-Line Explanation -`heapSort()`

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void heapSort(int[] nums)` | Sorts in-place using a max-heap. |
| 5 | `for (int i = n / 2 - 1; i >= 0; i--)` | **Build heap phase.** Start from last non-leaf node (`n/2 - 1`) and heapify each. Leaves are already valid heaps. |
| 6 | `heapify(nums, n, i);` | Ensure subtree rooted at `i` satisfies max-heap property. |
| 10 | `for (int i = n - 1; i > 0; i--)` | **Extract phase.** Repeatedly remove max (root) and place at end. |
| 11 | `swap(nums, 0, i);` | Swap root (maximum) with last unsorted element. Now max is in its final position. |
| 12 | `heapify(nums, i, 0);` | Heap size reduced by 1. Fix the root to maintain max-heap. |

## Line-by-Line Explanation -`heapify()`

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `private static void heapify(int[] nums, int size, int root)` | Fix max-heap property for subtree at `root`. Only considers first `size` elements. |
| 2 | `int largest = root;` | Assume root is the largest. |
| 3 | `int left = 2 * root + 1;` | Left child index (array representation of binary tree). |
| 4 | `int right = 2 * root + 2;` | Right child index. |
| 6 | `if (left < size && nums[left] > nums[largest])` | Left child exists and is larger than current largest. |
| 7 | `largest = left;` | Update largest to left child. |
| 9 | `if (right < size && nums[right] > nums[largest])` | Right child exists and is larger. |
| 10 | `largest = right;` | Update largest to right child. |
| 13 | `if (largest != root)` | Root is not the largest -heap property violated! |
| 14 | `swap(nums, root, largest);` | Fix by swapping root with largest child. |
| 15 | `heapify(nums, size, largest);` | Recursively fix the subtree that was affected by the swap. |

## Array as Binary Tree

```
Array: [10, 5, 3, 4, 1]

Tree representation:        Index formula:
        10 (0)              Parent: (i-1)/2
       /    \               Left child: 2i+1
     5 (1)   3 (2)         Right child: 2i+2
    /   \
  4 (3)  1 (4)

Last non-leaf: n/2 - 1 = 5/2 - 1 = 1 (node with value 5)
```

## Dry Run

Array: `[4, 10, 3, 5, 1]`

**Phase 1: Build Max Heap**
```
Start: [4, 10, 3, 5, 1]
i=1: heapify at index 1 → 10 > 5,1 → no change → [4, 10, 3, 5, 1]
i=0: heapify at index 0 → 4 < 10 → swap → [10, 4, 3, 5, 1]
     heapify at index 1 → 4 < 5 → swap → [10, 5, 3, 4, 1]
Max Heap: [10, 5, 3, 4, 1]
```

**Phase 2: Extract Max**
| Step | Swap | Heapify | Array |
|------|------|---------|-------|
| 1 | swap(0,4): 10↔1 | heapify(4,0): fix root | [**5**, 4, 3, 1, **10**] |
| 2 | swap(0,3): 5↔1 | heapify(3,0): fix root | [**4**, 1, 3, **5**, 10] |
| 3 | swap(0,2): 4↔3 | heapify(2,0): fix root | [**3**, 1, **4**, 5, 10] |
| 4 | swap(0,1): 3↔1 | done | [**1, 3**, 4, 5, 10] |

Result: `[1, 3, 4, 5, 10]` ✅

## Full Program

```java
package Sorting;

import java.util.Arrays;

class HeapSort {
    public static void main(String[] args) {
        int[] nums = {12, 11, 13, 5, 6, 7};
        
        System.out.println("Before: " + Arrays.toString(nums));
        heapSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void heapSort(int[] nums) {
        int n = nums.length;
        
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(nums, n, i);
        }
        
        for (int i = n - 1; i > 0; i--) {
            swap(nums, 0, i);
            heapify(nums, i, 0);
        }
    }
    
    private static void heapify(int[] nums, int size, int root) {
        int largest = root;
        int left = 2 * root + 1;
        int right = 2 * root + 2;
        
        if (left < size && nums[left] > nums[largest]) largest = left;
        if (right < size && nums[right] > nums[largest]) largest = right;
        
        if (largest != root) {
            swap(nums, root, largest);
            heapify(nums, size, largest);
        }
    }
    
    private static void swap(int[] nums, int a, int b) {
        int temp = nums[a];
        nums[a] = nums[b];
        nums[b] = temp;
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(n log n) |
| **Time (Average)** | O(n log n) |
| **Time (Worst)** | O(n log n) -guaranteed! |
| **Space** | O(1) -in-place (O(log n) if counting recursion) |
| **Stable** | ❌ No |

### Build Heap: O(n) not O(n log n)!
Although there are n/2 heapify calls, most nodes are near leaves (short subtrees).
Mathematical proof: sum of heights = O(n).

## When to Use Heap Sort

| Scenario | Why |
|----------|-----|
| Need guaranteed O(n log n) + O(1) space | Only sort that offers both! |
| Memory-constrained systems | No extra allocation |
| Finding K largest/smallest | Partial heap sort = O(n + k log n) |

## Heap Sort vs Quick Sort vs Merge Sort

| Feature | Heap Sort | Quick Sort | Merge Sort |
|---------|-----------|-----------|------------|
| Worst Time | O(n log n) | O(n²) | O(n log n) |
| Space | **O(1)** | O(log n) | O(n) |
| Stable | ❌ | ❌ | ✅ |
| Cache | Poor | **Best** | Good |
| In practice | Slower | **Fastest** | Safe |

> **Why heap sort is slower in practice:** Poor cache locality -parent and children are far apart in memory. Quick sort accesses sequential memory.

## 🖼️ Infographic Context

**For Napkin AI:** Two phases. Phase 1: Show array transforming into a max-heap tree structure (parent > children). Phase 2: Show root (max) being extracted and placed at end, then heap shrinking and re-heapifying. Include the array-to-tree index mapping formula.

Image path: `public/infographic/sorting/heap-sort.png`

## Key Interview Points

- **O(n log n) guaranteed** with **O(1) space** -unique combination!
- Two phases: **Build Heap** (O(n)) + **Extract Max** (O(n log n))
- Know the index formulas: left = 2i+1, right = 2i+2, parent = (i-1)/2
- Not stable, poor cache performance
- Related: Priority Queue uses the same heap structure
- Asked as: "Sort with O(1) extra space and O(n log n) guaranteed" → Heap Sort
