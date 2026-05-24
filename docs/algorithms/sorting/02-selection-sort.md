# Selection Sort

<iframe src="/infographic/sorting/selection_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Selection Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void selectionSort(int[] nums) {
    int n = nums.length;
    
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        
        for (int j = i + 1; j < n; j++) {
            if (nums[j] < nums[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap minimum with first unsorted position
        int temp = nums[i];
        nums[i] = nums[minIndex];
        nums[minIndex] = temp;
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void selectionSort(int[] nums)` | Sorts in-place by repeatedly selecting the minimum. |
| 4 | `for (int i = 0; i < n - 1; i++)` | Outer loop: `i` represents the boundary between sorted (left) and unsorted (right) portions. |
| 5 | `int minIndex = i;` | Assume first unsorted element is the minimum. |
| 7 | `for (int j = i + 1; j < n; j++)` | Scan through unsorted portion to find actual minimum. |
| 8 | `if (nums[j] < nums[minIndex])` | Found a smaller element. |
| 9 | `minIndex = j;` | Update minimum index. |
| 13-15 | Swap `nums[i]` and `nums[minIndex]` | Place the found minimum at the boundary of sorted portion. |

## Dry Run

Array: `[29, 10, 14, 37, 13]`

| Pass (i) | Unsorted Portion | Min Found | After Swap |
|-----------|-----------------|-----------|------------|
| 0 | [29, 10, 14, 37, 13] | 10 (idx 1) | [**10**, 29, 14, 37, 13] |
| 1 | [29, 14, 37, 13] | 13 (idx 4) | [10, **13**, 14, 37, 29] |
| 2 | [14, 37, 29] | 14 (idx 2) | [10, 13, **14**, 37, 29] |
| 3 | [37, 29] | 29 (idx 4) | [10, 13, 14, **29**, 37] |

Result: `[10, 13, 14, 29, 37]` ✅

## Full Program

```java
package Sorting;

import java.util.Arrays;

class SelectionSort {
    public static void main(String[] args) {
        int[] nums = {29, 10, 14, 37, 13};
        
        System.out.println("Before: " + Arrays.toString(nums));
        selectionSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void selectionSort(int[] nums) {
        int n = nums.length;
        
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            
            for (int j = i + 1; j < n; j++) {
                if (nums[j] < nums[minIndex]) {
                    minIndex = j;
                }
            }
            
            int temp = nums[i];
            nums[i] = nums[minIndex];
            nums[minIndex] = temp;
        }
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(n²) -always scans entire unsorted portion |
| **Time (Average)** | O(n²) |
| **Time (Worst)** | O(n²) |
| **Space** | O(1) -in-place |
| **Stable** | ❌ No -swapping can change relative order of equal elements |

## Selection Sort vs Bubble Sort

| Feature | Selection Sort | Bubble Sort |
|---------|---------------|-------------|
| Swaps | O(n) -exactly n-1 swaps | O(n²) -many swaps |
| Comparisons | O(n²) | O(n²) |
| Best case | O(n²) still | O(n) with optimization |
| Stable | ❌ No | ✅ Yes |
| When to prefer | When **writes/swaps are expensive** | When data is nearly sorted |

> **Key insight:** Selection sort does minimum number of swaps (n-1). Use when swap cost is high (e.g., writing to flash memory).

## Why Unstable?

```
Array: [5a, 3, 5b, 2]
Pass 1: min = 2 (idx 3), swap with idx 0 → [2, 3, 5b, 5a]
                                                        ^^  ^^
                                                   5b is now before 5a!
                                                   Original order was 5a, 5b
```

## 🖼️ Infographic Context

**For Napkin AI:** Show array divided into two parts: sorted (green, left) and unsorted (gray, right). In each pass, show a scanning arrow finding the minimum in unsorted portion, then an arrow placing it at the boundary. The sorted portion grows by 1 each pass. Highlight: "Always n-1 swaps regardless of input."

Image path: `public/infographic/sorting/selection-sort.png`

## Key Interview Points

- **Always O(n²)** -no best-case optimization possible
- Minimum swaps: exactly **n-1** swaps (unlike bubble sort's O(n²) swaps)
- **Not stable** -can disrupt relative ordering of equal elements
- Use when: memory writes are expensive, data is small
- Conceptually: "select the minimum, place it at the front, repeat"
