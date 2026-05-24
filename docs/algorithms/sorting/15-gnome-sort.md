# Gnome Sort

<iframe src="/infographic/sorting/gnome_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Gnome Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void gnomeSort(int[] nums) {
    int n = nums.length;
    int index = 0;

    while (index < n) {
        if (index == 0) {
            index++;
        } else if (nums[index] >= nums[index - 1]) {
            index++;
        } else {
            int temp = nums[index];
            nums[index] = nums[index - 1];
            nums[index - 1] = temp;
            index--;
        }
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void gnomeSort(int[] nums)` | Sorts array in-place. Named after garden gnomes sorting flower pots. |
| 3 | `int index = 0` | Start at the beginning. The "gnome" stands here. |
| 5 | `while (index < n)` | Keep going until gnome walks past the end. |
| 6-7 | `if (index == 0) index++` | At the start -can't look left, step forward. |
| 8-9 | `else if (nums[index] >= nums[index - 1]) index++` | Current ≥ previous: in order! Step forward. |
| 10-13 | `else { swap; index--; }` | Current < previous: wrong order! Swap and step backward to check again. |

## How It Works (The Garden Gnome Analogy)

```
Imagine a gnome sorting flower pots in a line:
- If the pot on my right is taller than me, step right (it's in order)
- If the pot on my right is shorter, swap it with me and step left (to fix order behind me)
- If I'm at the start, step right (nothing to compare on left)

Array: [5, 3, 2, 4]

index=0: At start → step right
index=1: nums[1]=3 < nums[0]=5 → swap → [3, 5, 2, 4], index=0
index=0: At start → step right
index=1: nums[1]=5 ≥ nums[0]=3 → step right
index=2: nums[2]=2 < nums[1]=5 → swap → [3, 2, 5, 4], index=1
index=1: nums[1]=2 < nums[0]=3 → swap → [2, 3, 5, 4], index=0
index=0: At start → step right
index=1: 3 ≥ 2 → step right
index=2: 5 ≥ 3 → step right
index=3: nums[3]=4 < nums[2]=5 → swap → [2, 3, 4, 5], index=2
index=2: 4 ≥ 3 → step right
index=3: 5 ≥ 4 → step right
index=4: index == n → done!

Result: [2, 3, 4, 5] ✅
```

## Full Program

```java
package Sorting;

import java.util.Arrays;

class GnomeSort {
    public static void main(String[] args) {
        int[] nums = {34, 2, 10, -9, 7, 6, 0, 15};
        System.out.println("Before: " + Arrays.toString(nums));

        gnomeSort(nums);

        System.out.println("After:  " + Arrays.toString(nums));
    }

    public static void gnomeSort(int[] nums) {
        int n = nums.length;
        int index = 0;

        while (index < n) {
            if (index == 0) {
                index++;
            } else if (nums[index] >= nums[index - 1]) {
                index++;
            } else {
                int temp = nums[index];
                nums[index] = nums[index - 1];
                nums[index - 1] = temp;
                index--;
            }
        }
    }
}
```

## Dry Run

```
Input: nums = [34, 2, 10, -9], n=4

index=0: index==0 → index=1
index=1: nums[1]=2 < nums[0]=34 → swap → [2, 34, 10, -9], index=0
index=0: index==0 → index=1
index=1: nums[1]=34 ≥ nums[0]=2 → index=2
index=2: nums[2]=10 < nums[1]=34 → swap → [2, 10, 34, -9], index=1
index=1: nums[1]=10 ≥ nums[0]=2 → index=2
index=2: nums[2]=34 ≥ nums[1]=10 → index=3
index=3: nums[3]=-9 < nums[2]=34 → swap → [2, 10, -9, 34], index=2
index=2: nums[2]=-9 < nums[1]=10 → swap → [2, -9, 10, 34], index=1
index=1: nums[1]=-9 < nums[0]=2 → swap → [-9, 2, 10, 34], index=0
index=0: index==0 → index=1
index=1: nums[1]=2 ≥ nums[0]=-9 → index=2
index=2: nums[2]=10 ≥ nums[1]=2 → index=3
index=3: nums[3]=34 ≥ nums[2]=10 → index=4
index=4: 4 == n → loop ends

Output: [-9, 2, 10, 34]
```

## Complexity Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity** | O(n²) |
| **Space Complexity** | O(1) |
| **Best Case** | O(n) -already sorted (just walks forward) |
| **Worst Case** | O(n²) -reverse sorted |
| **Stable** | Yes |

## When to Use

| Scenario | Recommendation |
|----------|---------------|
| Educational purposes / simplicity | ✅ Gnome Sort -easiest to understand |
| Very small arrays | ✅ Acceptable |
| Nearly sorted data | ✅ Behaves like insertion sort |
| Large datasets | ❌ O(n²) is too slow |
| Performance-critical code | ❌ Use merge/quick sort |

## Optimized Version (with position memory)

```java
public static void gnomeSortOptimized(int[] nums) {
    int n = nums.length;
    int index = 0;
    int lastForward = 0; // Remember where we were going forward

    while (index < n) {
        if (index == 0) {
            index = ++lastForward; // Jump back to last forward position
        } else if (nums[index] >= nums[index - 1]) {
            index = ++lastForward; // Move forward past sorted region
        } else {
            int temp = nums[index];
            nums[index] = nums[index - 1];
            nums[index - 1] = temp;
            index--;
        }
    }
}
```

This optimization avoids re-scanning already-sorted prefix -making it equivalent to insertion sort.

## Key Interview Points

1. **Simplest sorting algorithm**: Only uses one loop with 3 conditions -no nested loops
2. **Similar to insertion sort**: Effectively does the same work but with a different control structure
3. **Named after gnomes**: Conceptually, a gnome walks along flower pots and swaps misordered adjacent ones
4. **No nested loops**: Despite O(n²), the algorithm has only a single `while` loop -the quadratic behavior comes from the `index--` backtracking
5. **Stable**: Never swaps equal elements (uses `>=` check)
6. **Adaptive**: O(n) on already-sorted input -the gnome just walks forward without ever stepping back
