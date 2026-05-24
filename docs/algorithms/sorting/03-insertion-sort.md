# Insertion Sort

<iframe src="/infographic/sorting/insertion_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Insertion Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void insertionSort(int[] nums) {
    int n = nums.length;
    
    for (int i = 1; i < n; i++) {
        int key = nums[i];
        int j = i - 1;
        
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        
        nums[j + 1] = key;
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void insertionSort(int[] nums)` | Sorts in-place by inserting each element into its correct position. |
| 4 | `for (int i = 1; i < n; i++)` | Start from index 1. Element at index 0 is "already sorted" (single element). |
| 5 | `int key = nums[i];` | **Save the current element.** This is the card we want to insert in the right place. |
| 6 | `int j = i - 1;` | Start comparing with the element just before `i`. |
| 8 | `while (j >= 0 && nums[j] > key)` | Move backward through sorted portion. While elements are larger than key, they need to shift right. |
| 9 | `nums[j + 1] = nums[j];` | Shift element one position to the right (make room). |
| 10 | `j--;` | Move left to compare next element. |
| 13 | `nums[j + 1] = key;` | Insert key at correct position. Loop stopped when `nums[j] <= key`, so insert at `j+1`. |

## Analogy: Sorting Playing Cards

```
Hand (sorted): [3, 7, 10]
New card: 5

Step 1: 10 > 5 → shift right → [3, 7, _, 10]
Step 2: 7 > 5  → shift right → [3, _, 7, 10]
Step 3: 3 < 5  → stop! Insert 5 here → [3, 5, 7, 10]
```

## Dry Run

Array: `[5, 2, 4, 6, 1, 3]`

| Pass (i) | key | Shifts | Result |
|-----------|-----|--------|--------|
| 1 | 2 | 5→right | [**2, 5**, 4, 6, 1, 3] |
| 2 | 4 | 5→right | [2, **4, 5**, 6, 1, 3] |
| 3 | 6 | none | [2, 4, 5, **6**, 1, 3] |
| 4 | 1 | 6,5,4,2→right | [**1, 2, 4, 5, 6**, 3] |
| 5 | 3 | 6,5,4→right | [1, 2, **3, 4, 5, 6**] |

## Full Program

```java
package Sorting;

import java.util.Arrays;

class InsertionSort {
    public static void main(String[] args) {
        int[] nums = {5, 2, 4, 6, 1, 3};
        
        System.out.println("Before: " + Arrays.toString(nums));
        insertionSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void insertionSort(int[] nums) {
        int n = nums.length;
        
        for (int i = 1; i < n; i++) {
            int key = nums[i];
            int j = i - 1;
            
            while (j >= 0 && nums[j] > key) {
                nums[j + 1] = nums[j];
                j--;
            }
            
            nums[j + 1] = key;
        }
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(n) -already sorted, inner loop never executes |
| **Time (Average)** | O(n²) |
| **Time (Worst)** | O(n²) -reverse sorted |
| **Space** | O(1) -in-place |
| **Stable** | ✅ Yes -equal elements maintain original order |

## Why Insertion Sort Matters (Interview Favorites)

### 1. Best for Nearly Sorted Data
If array has at most `k` inversions, time is O(nk). For nearly sorted: O(n).

### 2. Used Inside Other Algorithms
- **Tim Sort** (Python/Java default): uses insertion sort for small runs
- **Introsort** (C++ STL): falls back to insertion sort for small partitions
- **Quick Sort optimization**: switch to insertion sort when partition < 10-16 elements

### 3. Online Algorithm
Can sort elements **as they arrive** (streaming data). No need to have all elements upfront.

## Variations

### Binary Insertion Sort

```java
public static void binaryInsertionSort(int[] nums) {
    for (int i = 1; i < nums.length; i++) {
        int key = nums[i];
        int pos = binarySearchPosition(nums, key, 0, i - 1);
        
        // Shift elements right
        for (int j = i - 1; j >= pos; j--) {
            nums[j + 1] = nums[j];
        }
        nums[pos] = key;
    }
}
```

> Reduces comparisons to O(n log n) but shifts still O(n²). Only helps when comparison is expensive.

## Comparison with Other O(n²) Sorts

| Feature | Bubble | Selection | Insertion |
|---------|--------|-----------|-----------|
| Best case | O(n) | O(n²) | **O(n)** |
| Adaptive | Yes | No | **Yes** |
| Stable | Yes | No | **Yes** |
| Online | No | No | **Yes** |
| Swaps | O(n²) | O(n) | O(n²) shifts |
| Practical use | Rarely | Rarely | **Yes** (small/nearly sorted) |

## 🖼️ Infographic Context

**For Napkin AI:** Show a hand of playing cards. One card at a time is picked from the unsorted pile and inserted into the correct position in the sorted hand. Show arrows indicating the shifting of larger cards to make room. Highlight that the left portion is always sorted.

Image path: `public/infographic/sorting/insertion-sort.png`

## Key Interview Points

- Like sorting cards in your hand -pick and insert
- **O(n) for nearly sorted** data -best among simple sorts
- **Stable** and **in-place**
- **Online** -can sort as data arrives
- Used in practice: Tim Sort uses it for small subarrays
- Preferred over bubble/selection sort in real implementations
- Asked as: "Most efficient sort for nearly sorted array?" → Insertion Sort
