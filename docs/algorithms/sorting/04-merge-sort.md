# Merge Sort

<iframe src="/infographic/sorting/merge_sort_interactive_infographic.html" width="100%" height="540" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Merge Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void mergeSort(int[] nums, int left, int right) {
    if (left >= right) return;
    
    int mid = left + (right - left) / 2;
    
    mergeSort(nums, left, mid);
    mergeSort(nums, mid + 1, right);
    merge(nums, left, mid, right);
}

private static void merge(int[] nums, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    int[] leftArr = new int[n1];
    int[] rightArr = new int[n2];
    
    for (int i = 0; i < n1; i++) leftArr[i] = nums[left + i];
    for (int i = 0; i < n2; i++) rightArr[i] = nums[mid + 1 + i];
    
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

## Line-by-Line Explanation -`mergeSort()`

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void mergeSort(int[] nums, int left, int right)` | Recursively sorts `nums[left..right]`. |
| 2 | `if (left >= right) return;` | **Base case:** single element or empty -already sorted. |
| 4 | `int mid = left + (right - left) / 2;` | Find middle point to divide array into two halves. |
| 6 | `mergeSort(nums, left, mid);` | **Divide:** recursively sort left half. |
| 7 | `mergeSort(nums, mid + 1, right);` | **Divide:** recursively sort right half. |
| 8 | `merge(nums, left, mid, right);` | **Conquer:** merge two sorted halves into one sorted array. |

## Line-by-Line Explanation -`merge()`

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `private static void merge(int[] nums, int left, int mid, int right)` | Merges two sorted subarrays: `[left..mid]` and `[mid+1..right]`. |
| 2-3 | `int n1 = mid - left + 1; int n2 = right - mid;` | Sizes of left and right subarrays. |
| 5-6 | `int[] leftArr = new int[n1]; int[] rightArr = new int[n2];` | Temporary arrays to hold copies. |
| 8-9 | Copy elements into `leftArr` and `rightArr` | Need copies because we'll overwrite `nums[]`. |
| 11 | `int i = 0, j = 0, k = left;` | `i` → left pointer, `j` → right pointer, `k` → position in original array. |
| 13 | `while (i < n1 && j < n2)` | Compare elements from both halves. |
| 14 | `if (leftArr[i] <= rightArr[j])` | `<=` ensures **stability** (equal elements keep original order). |
| 15 | `nums[k++] = leftArr[i++];` | Left element is smaller/equal → place it. |
| 17 | `nums[k++] = rightArr[j++];` | Right element is smaller → place it. |
| 20-21 | Copy remaining elements | One half may have leftover elements. |

## Recursion Tree Visualization

```
mergeSort([38, 27, 43, 3, 9, 82, 10])
├── mergeSort([38, 27, 43, 3])
│   ├── mergeSort([38, 27])
│   │   ├── mergeSort([38])  → base case
│   │   ├── mergeSort([27])  → base case
│   │   └── merge → [27, 38]
│   ├── mergeSort([43, 3])
│   │   ├── mergeSort([43])  → base case
│   │   ├── mergeSort([3])   → base case
│   │   └── merge → [3, 43]
│   └── merge → [3, 27, 38, 43]
├── mergeSort([9, 82, 10])
│   ├── mergeSort([9, 82])
│   │   └── merge → [9, 82]
│   ├── mergeSort([10])      → base case
│   └── merge → [9, 10, 82]
└── merge → [3, 9, 10, 27, 38, 43, 82]  ✅
```

## Full Program

```java
package Sorting;

import java.util.Arrays;

class MergeSort {
    public static void main(String[] args) {
        int[] nums = {38, 27, 43, 3, 9, 82, 10};
        
        System.out.println("Before: " + Arrays.toString(nums));
        mergeSort(nums, 0, nums.length - 1);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void mergeSort(int[] nums, int left, int right) {
        if (left >= right) return;
        
        int mid = left + (right - left) / 2;
        mergeSort(nums, left, mid);
        mergeSort(nums, mid + 1, right);
        merge(nums, left, mid, right);
    }
    
    private static void merge(int[] nums, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];
        
        for (int i = 0; i < n1; i++) leftArr[i] = nums[left + i];
        for (int i = 0; i < n2; i++) rightArr[i] = nums[mid + 1 + i];
        
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
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(n log n) |
| **Time (Average)** | O(n log n) |
| **Time (Worst)** | O(n log n) -guaranteed, unlike Quick Sort |
| **Space** | O(n) -temporary arrays for merging |
| **Stable** | ✅ Yes |

### Why O(n log n)?
- **log n** levels of recursion (halving each time)
- **n** work at each level (merging all elements)
- Total: n × log n

## When to Use Merge Sort

| Scenario | Why |
|----------|-----|
| Need **guaranteed O(n log n)** | Quick Sort can degrade to O(n²) |
| Need **stable sort** | Preserves order of equal elements |
| **Linked lists** | Merge sort is optimal for linked lists (O(1) extra space) |
| **External sorting** | Large files that don't fit in memory |
| Counting **inversions** | Modified merge sort counts inversions in O(n log n) |

## Interview Applications

```java
// 1. Count inversions (how unsorted is the array?)
// In merge step: when rightArr[j] < leftArr[i], it means
// leftArr[i..n1] are all > rightArr[j] → that's (n1 - i) inversions

// 2. Sort linked list (LeetCode 148)
// No random access needed -merge sort is perfect

// 3. External sort (sorting files larger than RAM)
// Split into chunks, sort each, merge sorted chunks
```

## 🖼️ Infographic Context

**For Napkin AI:** Show the divide-and-conquer process as a tree. Top: full unsorted array. Each level splits in half. Bottom: single elements. Then show merging back up -two sorted halves combining into one sorted array at each level. Use color coding: red for divide phase, green for merge/conquer phase. Show the merge step in detail: two pointers comparing and placing elements.

Image path: `public/infographic/sorting/merge-sort.png`

## Key Interview Points

- **Divide and Conquer** paradigm
- **Guaranteed O(n log n)** -worst case is same as average (unlike Quick Sort)
- **Stable** sort
- **O(n) extra space** -main disadvantage over Quick Sort
- Preferred for **linked lists** (no random access needed, O(1) extra space)
- Used in Java's `Arrays.sort()` for objects (Tim Sort is based on merge sort)
- Pattern: "Count inversions" = modified merge sort
