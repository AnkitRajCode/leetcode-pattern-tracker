# Fibonacci Search

<iframe src="/infographic/searching/fibonacci_search_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Fibonacci Search Interactive Visualization"></iframe>

## Function Code

```java
public static int fibonacciSearch(int[] nums, int target) {
    int n = nums.length;

    // Initialize Fibonacci numbers
    int fibM2 = 0;   // (m-2)th Fibonacci
    int fibM1 = 1;   // (m-1)th Fibonacci
    int fibM = fibM2 + fibM1; // m-th Fibonacci

    // Find smallest Fibonacci number >= n
    while (fibM < n) {
        fibM2 = fibM1;
        fibM1 = fibM;
        fibM = fibM2 + fibM1;
    }

    int offset = -1; // Marks eliminated range from front

    while (fibM > 1) {
        int i = Math.min(offset + fibM2, n - 1);

        if (nums[i] < target) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
        } else if (nums[i] > target) {
            fibM = fibM2;
            fibM1 = fibM1 - fibM2;
            fibM2 = fibM - fibM1;
        } else {
            return i;
        }
    }

    // Check last element
    if (fibM1 == 1 && offset + 1 < n && nums[offset + 1] == target) {
        return offset + 1;
    }

    return -1;
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static int fibonacciSearch(int[] nums, int target)` | Takes a **sorted** array and target value. |
| 4-6 | `int fibM2 = 0; int fibM1 = 1; int fibM = ...` | Initialize three consecutive Fibonacci numbers. |
| 9-12 | `while (fibM < n)` | Find the smallest Fibonacci number ≥ array length. This defines search granularity. |
| 14 | `int offset = -1;` | Tracks how much of the front has been eliminated. |
| 16 | `while (fibM > 1)` | Main loop -keeps narrowing the search range using Fibonacci splits. |
| 17 | `int i = Math.min(offset + fibM2, n - 1)` | Calculate comparison index. `Math.min` prevents out-of-bounds. |
| 19-22 | `if (nums[i] < target)` | Target is in the upper 2/3 -shift Fibonacci numbers down one step, move offset. |
| 23-26 | `else if (nums[i] > target)` | Target is in the lower 1/3 -shift Fibonacci numbers down two steps. |
| 27-28 | `else return i;` | Found the target! |
| 33-35 | `if (fibM1 == 1 && ...)` | One remaining element -check it directly. |

## How It Works (Fibonacci Splits)

```
Array:  [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100]
Size:    11
Target:  85

Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13 → fibM=13 ≥ 11

Step 1: offset=-1, fibM2=5, i = min(-1+5, 10) = 4
         nums[4]=45 < 85 → move right
         offset=4, fibM=8→5, fibM1=5→3, fibM2=3→2

Step 2: offset=4, fibM2=2, i = min(4+2, 10) = 6
         nums[6]=80 < 85 → move right
         offset=6, fibM=3→2, fibM1=2→1, fibM2=1→1

Step 3: offset=6, fibM2=1, i = min(6+1, 10) = 7
         nums[7]=82 < 85 → move right
         offset=7, fibM=2→1 → loop ends

Check: nums[offset+1] = nums[8] = 85 ✅ Found!
```

## Full Program

```java
package Searching;

class FibonacciSearch {
    public static void main(String[] args) {
        int[] nums = {10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100};

        int index = fibonacciSearch(nums, 85);

        if (index == -1) {
            System.out.println("Not found");
        } else {
            System.out.println("Found at index " + index);
        }
    }

    public static int fibonacciSearch(int[] nums, int target) {
        int n = nums.length;

        int fibM2 = 0;
        int fibM1 = 1;
        int fibM = fibM2 + fibM1;

        while (fibM < n) {
            fibM2 = fibM1;
            fibM1 = fibM;
            fibM = fibM2 + fibM1;
        }

        int offset = -1;

        while (fibM > 1) {
            int i = Math.min(offset + fibM2, n - 1);

            if (nums[i] < target) {
                fibM = fibM1;
                fibM1 = fibM2;
                fibM2 = fibM - fibM1;
                offset = i;
            } else if (nums[i] > target) {
                fibM = fibM2;
                fibM1 = fibM1 - fibM2;
                fibM2 = fibM - fibM1;
            } else {
                return i;
            }
        }

        if (fibM1 == 1 && offset + 1 < n && nums[offset + 1] == target) {
            return offset + 1;
        }

        return -1;
    }
}
```

## Dry Run

```
Input: nums = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100], target = 85

Initialization:
  n=11, fibM2=0, fibM1=1, fibM=1
  Build Fibonacci: 1→2→3→5→8→13  (13 ≥ 11)
  fibM2=5, fibM1=8, fibM=13, offset=-1

Iteration 1:
  i = min(-1 + 5, 10) = 4
  nums[4] = 45 < 85
  → fibM=8, fibM1=5, fibM2=3, offset=4

Iteration 2:
  i = min(4 + 3, 10) = 7
  nums[7] = 82 < 85
  → fibM=5, fibM1=3, fibM2=2, offset=7

Iteration 3:
  i = min(7 + 2, 10) = 9
  nums[9] = 90 > 85
  → fibM=2, fibM1=1, fibM2=1

Iteration 4:
  i = min(7 + 1, 10) = 8
  nums[8] = 85 == 85
  → return 8 ✅

Output: Found at index 8
```

## Complexity Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity** | O(log n) |
| **Space Complexity** | O(1) |
| **Best Case** | O(1) -target at a Fibonacci split point |
| **Worst Case** | O(log n) |
| **Comparison to Binary Search** | Uses addition/subtraction instead of division |

## When to Use

| Scenario | Recommendation |
|----------|---------------|
| Sorted array, CPU without fast division | ✅ Fibonacci Search |
| Large datasets with costly comparisons | ✅ Fibonacci Search |
| Random access is expensive (tape drives) | ✅ Fibonacci Search |
| General sorted array search | Binary Search is simpler |
| Unsorted data | ❌ Not applicable |

## Key Interview Points

1. **Division-free**: Uses only addition/subtraction -beneficial on hardware without fast division
2. **Splits unevenly**: Divides array into ~1/3 and ~2/3 instead of halves -better cache locality for some access patterns
3. **Comparison**: Same O(log n) as binary search but with different constant factors
4. **Prerequisite**: Array must be sorted
5. **Historical**: Useful in systems where multiplication/division is expensive (embedded, old CPUs)
