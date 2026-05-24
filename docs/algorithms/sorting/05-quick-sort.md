# Quick Sort

<iframe src="/infographic/sorting/quick_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Quick Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void quickSort(int[] nums, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(nums, low, high);
        
        quickSort(nums, low, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, high);
    }
}

private static int partition(int[] nums, int low, int high) {
    int pivot = nums[high];  // Choose last element as pivot
    int i = low - 1;         // Pointer for smaller elements
    
    for (int j = low; j < high; j++) {
        if (nums[j] <= pivot) {
            i++;
            swap(nums, i, j);
        }
    }
    
    swap(nums, i + 1, high);  // Place pivot at correct position
    return i + 1;             // Return pivot's final index
}

private static void swap(int[] nums, int a, int b) {
    int temp = nums[a];
    nums[a] = nums[b];
    nums[b] = temp;
}
```

## Line-by-Line Explanation -`quickSort()`

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void quickSort(int[] nums, int low, int high)` | Recursively sorts `nums[low..high]`. |
| 2 | `if (low < high)` | Base case: subarray has 0 or 1 element -already sorted. |
| 3 | `int pivotIndex = partition(nums, low, high);` | Partition array around pivot. Returns pivot's final position. |
| 5 | `quickSort(nums, low, pivotIndex - 1);` | Recursively sort elements **before** pivot. |
| 6 | `quickSort(nums, pivotIndex + 1, high);` | Recursively sort elements **after** pivot. |

## Line-by-Line Explanation -`partition()` (Lomuto's Scheme)

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `int pivot = nums[high];` | Choose **last element** as pivot. All elements will be arranged relative to this. |
| 2 | `int i = low - 1;` | `i` tracks the boundary: everything at index ≤ i is ≤ pivot. Starts before the array. |
| 4 | `for (int j = low; j < high; j++)` | `j` scans through the array (excluding pivot). |
| 5 | `if (nums[j] <= pivot)` | Current element belongs in the "small" partition. |
| 6 | `i++;` | Expand the "small" partition boundary. |
| 7 | `swap(nums, i, j);` | Move small element to the left side. |
| 11 | `swap(nums, i + 1, high);` | Place pivot between small and large partitions. |
| 12 | `return i + 1;` | Pivot is now at its **final sorted position**. |

## Partition Dry Run

Array: `[8, 3, 1, 7, 0, 10, 2]`, pivot = 2 (last element)

| j | nums[j] | nums[j]<=2? | i | Action | Array |
|---|---------|-------------|---|--------|-------|
| 0 | 8 | ❌ | -1 | skip | [8, 3, 1, 7, 0, 10, 2] |
| 1 | 3 | ❌ | -1 | skip | [8, 3, 1, 7, 0, 10, 2] |
| 2 | 1 | ✅ | 0 | swap(0,2) | [**1**, 3, **8**, 7, 0, 10, 2] |
| 3 | 7 | ❌ | 0 | skip | [1, 3, 8, 7, 0, 10, 2] |
| 4 | 0 | ✅ | 1 | swap(1,4) | [1, **0**, 8, 7, **3**, 10, 2] |
| 5 | 10 | ❌ | 1 | skip | [1, 0, 8, 7, 3, 10, 2] |

Final: swap(i+1, high) = swap(2, 6): `[1, 0, **2**, 7, 3, 10, 8]`

Pivot `2` is at index 2 -its correct sorted position! Left of 2: all ≤ 2. Right of 2: all > 2. ✅

## Full Program

```java
package Sorting;

import java.util.Arrays;

class QuickSort {
    public static void main(String[] args) {
        int[] nums = {10, 7, 8, 9, 1, 5};
        
        System.out.println("Before: " + Arrays.toString(nums));
        quickSort(nums, 0, nums.length - 1);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void quickSort(int[] nums, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(nums, low, high);
            quickSort(nums, low, pivotIndex - 1);
            quickSort(nums, pivotIndex + 1, high);
        }
    }
    
    private static int partition(int[] nums, int low, int high) {
        int pivot = nums[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (nums[j] <= pivot) {
                i++;
                swap(nums, i, j);
            }
        }
        
        swap(nums, i + 1, high);
        return i + 1;
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
| **Time (Best)** | O(n log n) -balanced partitions |
| **Time (Average)** | O(n log n) |
| **Time (Worst)** | O(n²) -already sorted + last element as pivot |
| **Space** | O(log n) -recursion stack (average) |
| **Stable** | ❌ No |

## Avoiding Worst Case: Randomized Pivot

```java
private static int partition(int[] nums, int low, int high) {
    // Randomize pivot to avoid O(n²) on sorted arrays
    int randomIndex = low + (int)(Math.random() * (high - low + 1));
    swap(nums, randomIndex, high);
    
    int pivot = nums[high];
    int i = low - 1;
    // ... rest same as before
}
```

## Hoare's Partition (Alternative -Fewer Swaps)

```java
private static int hoarePartition(int[] nums, int low, int high) {
    int pivot = nums[low];
    int i = low - 1;
    int j = high + 1;
    
    while (true) {
        do { i++; } while (nums[i] < pivot);
        do { j--; } while (nums[j] > pivot);
        
        if (i >= j) return j;
        swap(nums, i, j);
    }
}
```

> Hoare's does ~3x fewer swaps on average than Lomuto's.

## Quick Sort vs Merge Sort

| Feature | Quick Sort | Merge Sort |
|---------|-----------|------------|
| Average Time | O(n log n) | O(n log n) |
| Worst Time | O(n²) | **O(n log n)** |
| Space | **O(log n)** | O(n) |
| Stable | ❌ | ✅ |
| Cache | **Better** (in-place) | Worse (copies data) |
| In practice | **Faster** (smaller constants) | Safer guarantee |

> **Why Quick Sort is faster in practice:** Better cache locality (works on contiguous memory), fewer data movements, no extra allocation.

## 3-Way Partition (Dutch National Flag)

```java
// For arrays with many duplicates
public static void quickSort3Way(int[] nums, int low, int high) {
    if (low >= high) return;
    
    int lt = low, gt = high;
    int pivot = nums[low];
    int i = low + 1;
    
    while (i <= gt) {
        if (nums[i] < pivot) swap(nums, lt++, i++);
        else if (nums[i] > pivot) swap(nums, i, gt--);
        else i++;
    }
    // nums[lt..gt] all equal to pivot
    quickSort3Way(nums, low, lt - 1);
    quickSort3Way(nums, gt + 1, high);
}
```

## 🖼️ Infographic Context

**For Napkin AI:** Show the partition process step-by-step: pivot selected (highlighted), two regions forming (≤ pivot on left, > pivot on right), pivot placed in final position. Then show recursion on both halves. Include a comparison with merge sort: merge sort splits evenly then merges, quick sort partitions smartly then recurses.

Image path: `public/infographic/sorting/quick-sort.png`

## Key Interview Points

- **In-place** sort with O(log n) space (recursion stack)
- Fastest general-purpose sort **in practice** (cache-friendly)
- O(n²) worst case -mitigate with **randomized pivot** or **median-of-3**
- **Not stable** -use merge sort if stability needed
- Know both **Lomuto** (simpler) and **Hoare** (faster) partitions
- **3-way partition** for arrays with many duplicates
- Quick Select (finding kth element) uses the same partition logic
- Java's `Arrays.sort()` for primitives uses Dual-Pivot Quick Sort
