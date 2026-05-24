# Counting Sort

<iframe src="/infographic/sorting/counting_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Counting Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void countingSort(int[] nums) {
    int max = Arrays.stream(nums).max().getAsInt();
    int min = Arrays.stream(nums).min().getAsInt();
    int range = max - min + 1;
    
    int[] count = new int[range];
    int[] output = new int[nums.length];
    
    // Count occurrences
    for (int num : nums) {
        count[num - min]++;
    }
    
    // Cumulative count (prefix sum)
    for (int i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output (traverse right-to-left for stability)
    for (int i = nums.length - 1; i >= 0; i--) {
        output[count[nums[i] - min] - 1] = nums[i];
        count[nums[i] - min]--;
    }
    
    // Copy back
    System.arraycopy(output, 0, nums, 0, nums.length);
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void countingSort(int[] nums)` | Sorts integers by counting occurrences. Not comparison-based! |
| 2-3 | `int max = ...; int min = ...;` | Find value range. Handles negative numbers with `min` offset. |
| 4 | `int range = max - min + 1;` | Size of counting array. E.g., values 3-7 → range = 5. |
| 6 | `int[] count = new int[range];` | Count array -each index represents a value. |
| 7 | `int[] output = new int[nums.length];` | Temporary output array for stable placement. |
| 10 | `count[num - min]++;` | Count each value. `- min` maps value to 0-based index. |
| 14 | `count[i] += count[i - 1];` | **Prefix sum.** Now `count[i]` = number of elements ≤ value `i+min`. This tells us the final position. |
| 19 | `for (int i = nums.length - 1; i >= 0; i--)` | **Right-to-left** traversal ensures stability (equal elements keep original order). |
| 20 | `output[count[nums[i] - min] - 1] = nums[i];` | Place element at its correct position. `-1` because positions are 0-indexed. |
| 21 | `count[nums[i] - min]--;` | Decrement count -next same-value element goes one position earlier. |
| 25 | `System.arraycopy(output, 0, nums, 0, nums.length);` | Copy sorted output back to original array. |

## Dry Run

Array: `[4, 2, 2, 8, 3, 3, 1]`, min=1, max=8, range=8

**Step 1: Count occurrences**
| Value | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-------|---|---|---|---|---|---|---|---|
| Count | 1 | 2 | 2 | 1 | 0 | 0 | 0 | 1 |

**Step 2: Cumulative count (prefix sum)**
| Value | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|-------|---|---|---|---|---|---|---|---|
| Count | 1 | 3 | 5 | 6 | 6 | 6 | 6 | 7 |

Meaning: 1 element ≤1, 3 elements ≤2, 5 elements ≤3, etc.

**Step 3: Build output (right-to-left)**
| i | nums[i] | count[nums[i]-1] | Position | Output |
|---|---------|------------------|----------|--------|
| 6 | 1 | 1→0 | 0 | [1,_,_,_,_,_,_] |
| 5 | 3 | 5→4 | 4 | [1,_,_,_,3,_,_] |
| 4 | 3 | 4→3 | 3 | [1,_,_,3,3,_,_] |
| 3 | 8 | 7→6 | 6 | [1,_,_,3,3,_,8] |
| 2 | 2 | 3→2 | 2 | [1,_,2,3,3,_,8] |
| 1 | 2 | 2→1 | 1 | [1,2,2,3,3,_,8] |
| 0 | 4 | 6→5 | 5 | [1,2,2,3,3,4,8] |

Result: `[1, 2, 2, 3, 3, 4, 8]` ✅

## Simplified Version (When Stability Not Needed)

```java
public static void countingSortSimple(int[] nums) {
    int max = Arrays.stream(nums).max().getAsInt();
    int[] count = new int[max + 1];
    
    for (int num : nums) count[num]++;
    
    int idx = 0;
    for (int i = 0; i <= max; i++) {
        while (count[i] > 0) {
            nums[idx++] = i;
            count[i]--;
        }
    }
}
```

> Simpler but **not stable**. Use when only sorting integers without associated data.

## Full Program

```java
package Sorting;

import java.util.Arrays;

class CountingSort {
    public static void main(String[] args) {
        int[] nums = {4, 2, 2, 8, 3, 3, 1};
        
        System.out.println("Before: " + Arrays.toString(nums));
        countingSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void countingSort(int[] nums) {
        int max = Arrays.stream(nums).max().getAsInt();
        int min = Arrays.stream(nums).min().getAsInt();
        int range = max - min + 1;
        
        int[] count = new int[range];
        int[] output = new int[nums.length];
        
        for (int num : nums) count[num - min]++;
        
        for (int i = 1; i < range; i++) count[i] += count[i - 1];
        
        for (int i = nums.length - 1; i >= 0; i--) {
            output[count[nums[i] - min] - 1] = nums[i];
            count[nums[i] - min]--;
        }
        
        System.arraycopy(output, 0, nums, 0, nums.length);
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time** | O(n + k) where k = range of values |
| **Space** | O(n + k) -count array + output array |
| **Stable** | ✅ Yes (with right-to-left placement) |

## When to Use

| ✅ Use When | ❌ Don't Use When |
|------------|-----------------|
| Values are integers | Values are floats/strings |
| Range (k) ≈ n or k < n | Range >> n (wastes memory) |
| Need linear time sort | Values spread over huge range |
| As subroutine in Radix Sort | Memory is very limited |

## 🖼️ Infographic Context

**For Napkin AI:** Show three steps clearly. Step 1: Original array → counting occurrences into a count array (histogram). Step 2: Prefix sum on count array (shows final positions). Step 3: Right-to-left traversal placing elements in output array. Highlight that this is NOT comparison-based -it counts, doesn't compare.

Image path: `public/infographic/sorting/counting-sort.png`

## Key Interview Points

- **Not comparison-based** → breaks the O(n log n) barrier
- O(n + k) time -linear when k = O(n)
- **Stable** sort (with proper implementation)
- Used as subroutine in **Radix Sort**
- Only works for **integers** (or things mappable to integers)
- Wasteful when range >> n (e.g., sorting [1, 1000000])
- Asked as: "Sort array of values 0-9" or "Sort when range is known and small"
