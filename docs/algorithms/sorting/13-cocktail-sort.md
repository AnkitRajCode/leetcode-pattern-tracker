# Cocktail Sort (Bidirectional Bubble Sort)

<iframe src="/infographic/sorting/cocktail_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Cocktail Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void cocktailSort(int[] nums) {
    int n = nums.length;
    boolean swapped = true;
    int start = 0, end = n - 1;

    while (swapped) {
        swapped = false;

        // Forward pass (left to right) -bubbles largest to end
        for (int i = start; i < end; i++) {
            if (nums[i] > nums[i + 1]) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
                swapped = true;
            }
        }
        end--;

        if (!swapped) break;

        swapped = false;

        // Backward pass (right to left) -bubbles smallest to start
        for (int i = end; i > start; i--) {
            if (nums[i] < nums[i - 1]) {
                int temp = nums[i];
                nums[i] = nums[i - 1];
                nums[i - 1] = temp;
                swapped = true;
            }
        }
        start++;
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void cocktailSort(int[] nums)` | Sorts array in-place using bidirectional bubble sort. |
| 3 | `boolean swapped = true` | Controls the outer loop -stops when no swaps occur in a full pass. |
| 4 | `int start = 0, end = n - 1` | Tracks the unsorted portion boundaries. Shrinks from both ends. |
| 6 | `while (swapped)` | Keep going until a complete forward+backward pass makes no swaps. |
| 9-15 | Forward pass `for (i = start; i < end; i++)` | Like bubble sort: pushes the largest unsorted element to the right. |
| 16 | `end--` | Largest is now in place -shrink right boundary. |
| 18 | `if (!swapped) break` | Optimization: if forward pass made no swaps, array is sorted. |
| 22-28 | Backward pass `for (i = end; i > start; i--)` | Pushes the smallest unsorted element to the left. |
| 29 | `start++` | Smallest is now in place -shrink left boundary. |

## How It Works (Bidirectional Bubbling)

```
Array: [5, 1, 4, 2, 8, 0, 2]

Pass 1 Forward (→): Bubble max to right
  [1, 4, 2, 5, 0, 2, |8|]  ← 8 placed at end
  end = 5

Pass 1 Backward (←): Bubble min to left
  [|0|, 1, 4, 2, 5, 2, |8|]  ← 0 placed at start
  start = 1

Pass 2 Forward (→):
  [|0|, 1, 2, 4, 2, |5|, |8|]  ← 5 placed
  end = 4

Pass 2 Backward (←):
  [|0|, |1|, 2, 4, 2, |5|, |8|]  ← 1 already in place
  start = 2

Pass 3 Forward (→):
  [|0|, |1|, 2, 2, |4|, |5|, |8|]  ← 4 placed
  end = 3

Pass 3 Backward (←):
  [|0|, |1|, |2|, 2, |4|, |5|, |8|]
  start = 3

Result: [0, 1, 2, 2, 4, 5, 8] ✅
```

## Full Program

```java
package Sorting;

import java.util.Arrays;

class CocktailSort {
    public static void main(String[] args) {
        int[] nums = {5, 1, 4, 2, 8, 0, 2};
        System.out.println("Before: " + Arrays.toString(nums));

        cocktailSort(nums);

        System.out.println("After:  " + Arrays.toString(nums));
    }

    public static void cocktailSort(int[] nums) {
        int n = nums.length;
        boolean swapped = true;
        int start = 0, end = n - 1;

        while (swapped) {
            swapped = false;

            for (int i = start; i < end; i++) {
                if (nums[i] > nums[i + 1]) {
                    int temp = nums[i];
                    nums[i] = nums[i + 1];
                    nums[i + 1] = temp;
                    swapped = true;
                }
            }
            end--;

            if (!swapped) break;

            swapped = false;

            for (int i = end; i > start; i--) {
                if (nums[i] < nums[i - 1]) {
                    int temp = nums[i];
                    nums[i] = nums[i - 1];
                    nums[i - 1] = temp;
                    swapped = true;
                }
            }
            start++;
        }
    }
}
```

## Dry Run

```
Input: nums = [5, 1, 4, 2, 8, 0, 2]
n=7, start=0, end=6

--- Outer Loop Iteration 1 ---

Forward pass (i: 0→5):
  i=0: 5>1 → swap → [1, 5, 4, 2, 8, 0, 2]
  i=1: 5>4 → swap → [1, 4, 5, 2, 8, 0, 2]
  i=2: 5>2 → swap → [1, 4, 2, 5, 8, 0, 2]
  i=3: 5<8 → no swap
  i=4: 8>0 → swap → [1, 4, 2, 5, 0, 8, 2]
  i=5: 8>2 → swap → [1, 4, 2, 5, 0, 2, 8]
  swapped=true, end=5

Backward pass (i: 5→1):
  i=5: 2>0 → no (checking i < i-1)... 2<5? no... wait
  i=5: nums[5]=2 < nums[4]=0? No
  i=4: nums[4]=0 < nums[3]=5? Yes → swap → [1, 4, 2, 0, 5, 2, 8]
  i=3: nums[3]=0 < nums[2]=2? Yes → swap → [1, 4, 0, 2, 5, 2, 8]
  i=2: nums[2]=0 < nums[1]=4? Yes → swap → [1, 0, 4, 2, 5, 2, 8]
  i=1: nums[1]=0 < nums[0]=1? Yes → swap → [0, 1, 4, 2, 5, 2, 8]
  swapped=true, start=1

--- Outer Loop Iteration 2 ---

Forward pass (i: 1→4):
  i=1: 1<4 → no swap
  i=2: 4>2 → swap → [0, 1, 2, 4, 5, 2, 8]
  i=3: 4<5 → no swap
  i=4: 5>2 → swap → [0, 1, 2, 4, 2, 5, 8]
  swapped=true, end=4

Backward pass (i: 4→2):
  i=4: nums[4]=2 < nums[3]=4? Yes → swap → [0, 1, 2, 2, 4, 5, 8]
  i=3: nums[3]=2 < nums[2]=2? No
  i=2: nums[2]=2 < nums[1]=1? No
  swapped=true, start=2

--- Outer Loop Iteration 3 ---

Forward pass (i: 2→3):
  i=2: 2<=2 → no swap
  i=3: 2<4 → no swap
  swapped=false → break!

Output: [0, 1, 2, 2, 4, 5, 8]
```

## Complexity Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity** | O(n²) |
| **Space Complexity** | O(1) |
| **Best Case** | O(n) -already sorted |
| **Worst Case** | O(n²) -reverse sorted |
| **Stable** | Yes |

## When to Use

| Scenario | Recommendation |
|----------|---------------|
| Small arrays with elements at both ends out of place | ✅ Cocktail Sort |
| "Turtle" problem in bubble sort | ✅ Cocktail Sort (fixes it) |
| Educational / interview discussion | ✅ Good to know |
| Large datasets | ❌ Use merge/quick sort |
| Nearly sorted data | Insertion sort is better |

## Key Interview Points

1. **Fixes "turtle" problem**: Bubble sort moves small elements at the end very slowly (one position per pass). Cocktail sort's backward pass fixes this.
2. **Bidirectional**: Forward pass = bubble sort (max to right). Backward pass = reverse bubble sort (min to left).
3. **Same complexity as bubble sort**: O(n²) worst/average, but fewer passes in practice for certain inputs.
4. **Stable sort**: Equal elements maintain relative order.
5. **Shrinking boundaries**: `start++` and `end--` skip already-placed elements -minor optimization.
