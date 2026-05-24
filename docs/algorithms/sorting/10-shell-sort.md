# Shell Sort

<iframe src="/infographic/sorting/shell_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Shell Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void shellSort(int[] nums) {
    int n = nums.length;
    
    // Start with large gap, reduce by half each iteration
    for (int gap = n / 2; gap > 0; gap /= 2) {
        // Gapped insertion sort
        for (int i = gap; i < n; i++) {
            int key = nums[i];
            int j = i;
            
            while (j >= gap && nums[j - gap] > key) {
                nums[j] = nums[j - gap];
                j -= gap;
            }
            
            nums[j] = key;
        }
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void shellSort(int[] nums)` | Generalization of insertion sort with decreasing gaps. |
| 5 | `for (int gap = n / 2; gap > 0; gap /= 2)` | Start with large gap and halve it each pass. Last pass (gap=1) is standard insertion sort. |
| 7 | `for (int i = gap; i < n; i++)` | For each element, do insertion sort with step size = gap. |
| 8 | `int key = nums[i];` | Element to insert (same as insertion sort). |
| 9 | `int j = i;` | Position pointer. |
| 11 | `while (j >= gap && nums[j - gap] > key)` | Compare with element `gap` positions behind (not adjacent). Shift if larger. |
| 12 | `nums[j] = nums[j - gap];` | Shift element `gap` positions forward. |
| 13 | `j -= gap;` | Move back by `gap`. |
| 16 | `nums[j] = key;` | Insert element at correct gapped position. |

## How It Works

```
Array: [12, 34, 54, 2, 3]   n=5

Gap = 5/2 = 2:
  Compare elements 2 apart: (12,54), (34,2), (54,3)
  After: [3, 2, 12, 34, 54]  ← partially sorted!

Gap = 2/2 = 1:
  Standard insertion sort on nearly-sorted array → O(n)
  After: [2, 3, 12, 34, 54]  ✅
```

**Key insight:** Large gaps move elements far quickly. Small gaps do fine-tuning. By the time gap=1, the array is nearly sorted → insertion sort is O(n) on nearly sorted data!

## Dry Run

Array: `[23, 29, 15, 19, 31, 7, 9, 5, 2]`, n=9

**Gap = 4:**
| Compare | Action |
|---------|--------|
| nums[0]=23 vs nums[4]=31 | 23<31, ok |
| nums[1]=29 vs nums[5]=7 | swap → [23,7,15,19,31,29,9,5,2] |
| nums[2]=15 vs nums[6]=9 | swap → [23,7,9,19,31,29,15,5,2] |
| nums[3]=19 vs nums[7]=5 | swap → [23,7,9,5,31,29,15,19,2] |
| nums[4]=31 vs nums[8]=2 | swap → [23,7,9,5,2,29,15,19,31] |

**Gap = 2:**
Gapped insertion sort with step=2... array gets more sorted.

**Gap = 1:**
Standard insertion sort on nearly-sorted array → few swaps needed.

Result: `[2, 5, 7, 9, 15, 19, 23, 29, 31]` ✅

## Full Program

```java
package Sorting;

import java.util.Arrays;

class ShellSort {
    public static void main(String[] args) {
        int[] nums = {23, 29, 15, 19, 31, 7, 9, 5, 2};
        
        System.out.println("Before: " + Arrays.toString(nums));
        shellSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void shellSort(int[] nums) {
        int n = nums.length;
        
        for (int gap = n / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int key = nums[i];
                int j = i;
                
                while (j >= gap && nums[j - gap] > key) {
                    nums[j] = nums[j - gap];
                    j -= gap;
                }
                
                nums[j] = key;
            }
        }
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(n log n) -with good gap sequence |
| **Time (Average)** | O(n^1.25) to O(n^1.5) -depends on gap sequence |
| **Time (Worst)** | O(n²) -with n/2 gap sequence (but rarely hits) |
| **Space** | O(1) -in-place |
| **Stable** | ❌ No |

## Gap Sequences

| Sequence | Worst Case | Name |
|----------|-----------|------|
| n/2, n/4, ..., 1 | O(n²) | Shell's original |
| 2^k - 1: 1, 3, 7, 15, 31... | O(n^(3/2)) | Hibbard |
| 3^k-1 / 2: 1, 4, 13, 40, 121... | O(n^(3/2)) | Knuth |
| 2^p × 3^q: 1, 2, 3, 4, 6, 8, 9, 12... | O(n log² n) | Pratt |

### Knuth's Sequence (Recommended)

```java
public static void shellSortKnuth(int[] nums) {
    int n = nums.length;
    int gap = 1;
    while (gap < n / 3) gap = 3 * gap + 1;  // 1, 4, 13, 40, 121...
    
    while (gap >= 1) {
        for (int i = gap; i < n; i++) {
            int key = nums[i];
            int j = i;
            while (j >= gap && nums[j - gap] > key) {
                nums[j] = nums[j - gap];
                j -= gap;
            }
            nums[j] = key;
        }
        gap /= 3;
    }
}
```

## Why Shell Sort Matters

| vs Insertion Sort | Shell Sort Advantage |
|-------------------|---------------------|
| Moves elements 1 position at a time | Moves elements **far** with large gaps |
| O(n²) worst case | O(n^1.25) average |
| Good for nearly sorted | Good for **any** data |

> Shell sort is insertion sort "on steroids" -it pre-processes the array with large gaps so that the final insertion sort pass (gap=1) has very little work to do.

## 🖼️ Infographic Context

**For Napkin AI:** Show the array being sorted with decreasing gap sizes. Gap=4: elements far apart get compared. Gap=2: closer elements. Gap=1: adjacent (standard insertion sort). Use colored subgroups to show which elements are being compared at each gap. Show that large gaps quickly move elements near their final position.

Image path: `public/infographic/sorting/shell-sort.png`

## Key Interview Points

- **Generalized insertion sort** with decreasing gap sequence
- In-place, O(1) space
- Better than O(n²) -around O(n^1.25) in practice
- Not stable (gaps cause non-adjacent swaps)
- Gap sequence choice affects performance significantly
- Good practical sort for medium-sized arrays (faster than insertion sort)
- Used in embedded systems where memory is limited and code simplicity matters
