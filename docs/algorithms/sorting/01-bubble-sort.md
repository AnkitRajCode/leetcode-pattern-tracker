# Bubble Sort

<iframe src="/infographic/sorting/bubble_sort_interactive_infographic.html" width="100%" height="450" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Bubble Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void bubbleSort(int[] nums) {
    int n = nums.length;
    
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        
        for (int j = 0; j < n - 1 - i; j++) {
            if (nums[j] > nums[j + 1]) {
                int temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
                swapped = true;
            }
        }
        
        if (!swapped) break;  // Array is already sorted
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void bubbleSort(int[] nums)` | Sorts array in-place. No return needed. |
| 2 | `int n = nums.length;` | Store length for readability. |
| 4 | `for (int i = 0; i < n - 1; i++)` | Outer loop: after each pass, the largest unsorted element "bubbles up" to its correct position. Need at most n-1 passes. |
| 5 | `boolean swapped = false;` | Optimization flag. If no swap happens in a pass, array is sorted. |
| 7 | `for (int j = 0; j < n - 1 - i; j++)` | Inner loop: compare adjacent elements. `n-1-i` because last `i` elements are already in place. |
| 8 | `if (nums[j] > nums[j + 1])` | If current > next, they're in wrong order. |
| 9-11 | `temp = nums[j]; nums[j] = nums[j+1]; nums[j+1] = temp;` | Swap adjacent elements. |
| 12 | `swapped = true;` | Record that a swap happened. |
| 15 | `if (!swapped) break;` | **Early termination:** if no swaps in entire pass, array is sorted. This makes best case O(n). |

## Dry Run

Array: `[72, 38, 91, 55, 18, 67, 44]`

**Pass 1** (i=0): Compare all adjacent pairs
| j | Compare | Action | Array State |
|---|---------|--------|-------------|
| 0 | 72 > 38? ✅ | Swap | [**38, 72**, 91, 55, 18, 67, 44] |
| 1 | 72 > 91? ❌ | Skip | [38, 72, 91, 55, 18, 67, 44] |
| 2 | 91 > 55? ✅ | Swap | [38, 72, **55, 91**, 18, 67, 44] |
| 3 | 91 > 18? ✅ | Swap | [38, 72, 55, **18, 91**, 67, 44] |
| 4 | 91 > 67? ✅ | Swap | [38, 72, 55, 18, **67, 91**, 44] |
| 5 | 91 > 44? ✅ | Swap | [38, 72, 55, 18, 67, **44, 91**] |

After pass 1: `91` is in correct position.

**Pass 2** (i=1):
| j | Compare | Action | Array State |
|---|---------|--------|-------------|
| 0 | 38 > 72? ❌ | Skip | [38, 72, 55, 18, 67, 44, 91] |
| 1 | 72 > 55? ✅ | Swap | [38, **55, 72**, 18, 67, 44, 91] |
| 2 | 72 > 18? ✅ | Swap | [38, 55, **18, 72**, 67, 44, 91] |
| 3 | 72 > 67? ✅ | Swap | [38, 55, 18, **67, 72**, 44, 91] |
| 4 | 72 > 44? ✅ | Swap | [38, 55, 18, 67, **44, 72**, 91] |

After pass 2: `72` is in correct position.

**Pass 3** (i=2):
| j | Compare | Action | Array State |
|---|---------|--------|-------------|
| 0 | 38 > 55? ❌ | Skip | [38, 55, 18, 67, 44, 72, 91] |
| 1 | 55 > 18? ✅ | Swap | [38, **18, 55**, 67, 44, 72, 91] |
| 2 | 55 > 67? ❌ | Skip | [38, 18, 55, 67, 44, 72, 91] |
| 3 | 67 > 44? ✅ | Swap | [38, 18, 55, **44, 67**, 72, 91] |

After pass 3: `67` is in correct position.

**Pass 4** (i=3):
| j | Compare | Action | Array State |
|---|---------|--------|-------------|
| 0 | 38 > 18? ✅ | Swap | [**18, 38**, 55, 44, 67, 72, 91] |
| 1 | 38 > 55? ❌ | Skip | [18, 38, 55, 44, 67, 72, 91] |
| 2 | 55 > 44? ✅ | Swap | [18, 38, **44, 55**, 67, 72, 91] |

After pass 4: `55` is in correct position.

**Pass 5** (i=4):
| j | Compare | Action | Array State |
|---|---------|--------|-------------|
| 0 | 18 > 38? ❌ | Skip | [18, 38, 44, 55, 67, 72, 91] |
| 1 | 38 > 44? ❌ | Skip | [18, 38, 44, 55, 67, 72, 91] |

After pass 5: No swaps → **early exit!** Array is sorted: `[18, 38, 44, 55, 67, 72, 91]`

## Full Program

```java
package Sorting;

import java.util.Arrays;

class BubbleSort {
    public static void main(String[] args) {
        int[] nums = {72, 38, 91, 55, 18, 67, 44};
        
        System.out.println("Before: " + Arrays.toString(nums));
        bubbleSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void bubbleSort(int[] nums) {
        int n = nums.length;
        
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            for (int j = 0; j < n - 1 - i; j++) {
                if (nums[j] > nums[j + 1]) {
                    int temp = nums[j];
                    nums[j] = nums[j + 1];
                    nums[j + 1] = temp;
                    swapped = true;
                }
            }
            
            if (!swapped) break;
        }
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(n) -already sorted, `swapped` flag breaks early |
| **Time (Average)** | O(n²) |
| **Time (Worst)** | O(n²) -reverse sorted |
| **Space** | O(1) -in-place |
| **Stable** | ✅ Yes -equal elements maintain relative order |

## Why "Bubble" Sort?

Larger elements **bubble up** to the end of the array with each pass, like air bubbles rising in water.

## When to Use

- **Never** in production (O(n²) is too slow)
- Educational purposes -simplest sort to understand
- When array is **nearly sorted** -O(n) with early termination
- When array is **very small** (< 10 elements)

## Key Interview Points

- Simplest sorting algorithm -O(n²) average/worst
- **Stable sort** (doesn't change relative order of equal elements)
- Only O(n) best case because of `swapped` optimization
- Rarely asked to implement, but asked: "When is bubble sort useful?" → nearly sorted data
- Total swaps = number of inversions in the array
