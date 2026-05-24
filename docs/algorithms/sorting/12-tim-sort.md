# Tim Sort

<iframe src="/infographic/sorting/tim_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Tim Sort Interactive Visualization"></iframe>

## Overview

Tim Sort is a **hybrid** sorting algorithm combining **Merge Sort** and **Insertion Sort**. It's the default sorting algorithm in:
- Java's `Arrays.sort()` for objects
- Python's `sorted()` and `list.sort()`
- Android, Swift, Rust standard libraries

## Function Code (Simplified Implementation)

```java
private static final int MIN_RUN = 32;

public static void timSort(int[] nums) {
    int n = nums.length;
    
    // Step 1: Sort small runs using insertion sort
    for (int i = 0; i < n; i += MIN_RUN) {
        insertionSort(nums, i, Math.min(i + MIN_RUN - 1, n - 1));
    }
    
    // Step 2: Merge runs, doubling size each iteration
    for (int size = MIN_RUN; size < n; size *= 2) {
        for (int left = 0; left < n; left += 2 * size) {
            int mid = Math.min(left + size - 1, n - 1);
            int right = Math.min(left + 2 * size - 1, n - 1);
            
            if (mid < right) {
                merge(nums, left, mid, right);
            }
        }
    }
}

private static void insertionSort(int[] nums, int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = nums[i];
        int j = i - 1;
        
        while (j >= left && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = key;
    }
}

private static void merge(int[] nums, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int[] leftArr = new int[n1];
    int[] rightArr = new int[n2];
    
    System.arraycopy(nums, left, leftArr, 0, n1);
    System.arraycopy(nums, mid + 1, rightArr, 0, n2);
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            nums[k++] = leftArr[i++];
        } else {
            nums[k++] = rightArr[j++];
        }
    }
    
    while (i < n1) nums[k++] = leftArr[i++];
    while (j < n2) nums[k++] = rightArr[j++];
}
```

## Line-by-Line Explanation -`timSort()`

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `private static final int MIN_RUN = 32;` | Minimum run size. Insertion sort is fast for small arrays (~32-64 elements). |
| 3 | `public static void timSort(int[] nums)` | Hybrid sort: insertion sort for small chunks + merge sort for combining. |
| 7 | `for (int i = 0; i < n; i += MIN_RUN)` | Divide array into runs of size MIN_RUN. |
| 8 | `insertionSort(nums, i, Math.min(...))` | Sort each run with insertion sort. Fast because runs are small. |
| 12 | `for (int size = MIN_RUN; size < n; size *= 2)` | Merge phase: start merging runs of size MIN_RUN, then 2×MIN_RUN, then 4×MIN_RUN... |
| 13 | `for (int left = 0; left < n; left += 2 * size)` | Process pairs of adjacent runs for merging. |
| 14-15 | Calculate `mid` and `right` | Boundaries for the two runs being merged. |
| 17 | `if (mid < right)` | Only merge if there are two runs (not a single leftover). |
| 18 | `merge(nums, left, mid, right);` | Merge two sorted runs into one. |

## Why Tim Sort is Brilliant

### 1. Exploits Existing Order

Real-world data is often **partially sorted**. Tim Sort detects natural "runs" (ascending or descending sequences) and uses them.

```
Data: [1, 3, 5, 7, 2, 4, 6, 8]
       ^^^^^^^^^ already sorted run!    ^^^^^^^^^ another sorted run!
Tim Sort finds these and just merges them. O(n) for already-sorted data!
```

### 2. Small Arrays → Insertion Sort

Insertion sort has:
- Lower constant factors than merge sort
- Better cache behavior for small arrays
- O(n) for nearly sorted data

### 3. Galloping Mode (Real Tim Sort)

When one run is consistently "winning" during merge, Tim Sort switches to **galloping mode** -uses exponential search to find the insertion point, skipping many comparisons.

## Full Program

```java
package Sorting;

import java.util.Arrays;

class TimSort {
    private static final int MIN_RUN = 32;
    
    public static void main(String[] args) {
        int[] nums = {5, 21, 7, 23, 19, 10, 11, 42, 1, 3, 8, 15};
        
        System.out.println("Before: " + Arrays.toString(nums));
        timSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void timSort(int[] nums) {
        int n = nums.length;
        
        for (int i = 0; i < n; i += MIN_RUN) {
            insertionSort(nums, i, Math.min(i + MIN_RUN - 1, n - 1));
        }
        
        for (int size = MIN_RUN; size < n; size *= 2) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = Math.min(left + size - 1, n - 1);
                int right = Math.min(left + 2 * size - 1, n - 1);
                if (mid < right) merge(nums, left, mid, right);
            }
        }
    }
    
    private static void insertionSort(int[] nums, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = nums[i];
            int j = i - 1;
            while (j >= left && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            nums[j + 1] = key;
        }
    }
    
    private static void merge(int[] nums, int left, int mid, int right) {
        int n1 = mid - left + 1, n2 = right - mid;
        int[] L = new int[n1], R = new int[n2];
        System.arraycopy(nums, left, L, 0, n1);
        System.arraycopy(nums, mid + 1, R, 0, n2);
        
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2)
            nums[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
        while (i < n1) nums[k++] = L[i++];
        while (j < n2) nums[k++] = R[j++];
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(n) -already sorted data (natural runs span entire array) |
| **Time (Average)** | O(n log n) |
| **Time (Worst)** | O(n log n) |
| **Space** | O(n) -for merge step |
| **Stable** | ✅ Yes |

## Tim Sort vs Others

| Feature | Tim Sort | Merge Sort | Quick Sort |
|---------|----------|-----------|------------|
| Best case | **O(n)** | O(n log n) | O(n log n) |
| Worst case | O(n log n) | O(n log n) | O(n²) |
| Stable | ✅ | ✅ | ❌ |
| Adaptive | **✅ Yes** | ❌ No | ❌ No |
| Real-world | **Fastest** | Good | Fast for random |
| Space | O(n) | O(n) | O(log n) |

## Real Implementation Details (Java's Tim Sort)

1. **MIN_RUN calculation:** Chosen between 32-64 to make merge count a power of 2
2. **Natural run detection:** Finds both ascending and descending (reverses descending)
3. **Merge stack:** Maintains invariant: run sizes follow Fibonacci-like pattern
4. **Galloping mode:** Exponential search during merge when one side keeps winning
5. **Temporary buffer:** Only allocates for the smaller of two runs being merged

## 🖼️ Infographic Context

**For Napkin AI:** Show a real-world array with some natural ordering. Step 1: Identify natural runs (highlight ascending/descending sequences). Step 2: Extend short runs to MIN_RUN using insertion sort. Step 3: Merge runs bottom-up. Show the hybrid nature: "Best of both worlds -insertion sort's efficiency on small data + merge sort's guaranteed O(n log n)."

Image path: `public/infographic/sorting/tim-sort.png`

## Key Interview Points

- **Hybrid:** Insertion Sort + Merge Sort
- **Default sort** in Java (objects), Python, Android, Swift, Rust
- **Adaptive:** O(n) on already-sorted data, O(n log n) worst case
- **Stable** sort -maintains relative order of equal elements
- Exploits **natural runs** in real-world data
- Key insight: real data is rarely random -Tim Sort is designed for this reality
- Asked as: "Why does Java use different sorts for primitives vs objects?"
  - Primitives: Dual-Pivot Quick Sort (unstable but faster, stability doesn't matter for primitives)
  - Objects: Tim Sort (stable, adaptive)
