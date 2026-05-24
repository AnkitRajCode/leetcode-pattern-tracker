# Radix Sort

<iframe src="/infographic/sorting/radix_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Radix Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void radixSort(int[] nums) {
    int max = Arrays.stream(nums).max().getAsInt();
    
    // Sort by each digit position (1s, 10s, 100s, ...)
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(nums, exp);
    }
}

private static void countingSortByDigit(int[] nums, int exp) {
    int n = nums.length;
    int[] output = new int[n];
    int[] count = new int[10];  // Digits 0-9
    
    // Count occurrences of each digit
    for (int num : nums) {
        int digit = (num / exp) % 10;
        count[digit]++;
    }
    
    // Cumulative count
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output (right-to-left for stability)
    for (int i = n - 1; i >= 0; i--) {
        int digit = (nums[i] / exp) % 10;
        output[count[digit] - 1] = nums[i];
        count[digit]--;
    }
    
    System.arraycopy(output, 0, nums, 0, n);
}
```

## Line-by-Line Explanation -`radixSort()`

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void radixSort(int[] nums)` | Sorts by processing digits from least significant to most significant. |
| 2 | `int max = Arrays.stream(nums).max().getAsInt();` | Find max to determine number of digits (iterations needed). |
| 5 | `for (int exp = 1; max / exp > 0; exp *= 10)` | Process each digit place: units (1), tens (10), hundreds (100)... Loop runs `d` times where `d` = number of digits in max. |
| 6 | `countingSortByDigit(nums, exp);` | Stable sort by current digit position. |

## Line-by-Line Explanation -`countingSortByDigit()`

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `private static void countingSortByDigit(int[] nums, int exp)` | Counting sort using only the digit at position `exp`. |
| 4 | `int[] count = new int[10];` | Only 10 possible digits (0-9). |
| 7 | `int digit = (num / exp) % 10;` | Extract digit at position `exp`. E.g., 345: exp=10 → (345/10)%10 = 34%10 = **4**. |
| 8 | `count[digit]++;` | Count occurrences of this digit. |
| 12 | Cumulative count | Determines final positions (same as counting sort). |
| 16 | Right-to-left placement | **Must be right-to-left** for stability. Stability is crucial -it preserves order from previous digit sorts. |

## Why LSD (Least Significant Digit First)?

```
Array: [170, 45, 75, 90, 802, 24, 2, 66]

Sort by 1s digit:  [170, 90, 802, 2, 24, 45, 75, 66]
Sort by 10s digit: [802, 2, 24, 45, 66, 170, 75, 90]
Sort by 100s digit:[2, 24, 45, 66, 75, 90, 170, 802]  ✅

Key: Each stable sort preserves the order established by previous sorts!
```

## Dry Run

Array: `[170, 45, 75, 90, 802, 24, 2, 66]`

**Pass 1: Sort by units digit (exp=1)**
| Number | Digit | 
|--------|-------|
| 170 | 0 |
| 45 | 5 |
| 75 | 5 |
| 90 | 0 |
| 802 | 2 |
| 24 | 4 |
| 2 | 2 |
| 66 | 6 |

After: `[170, 90, 802, 2, 24, 45, 75, 66]`

**Pass 2: Sort by tens digit (exp=10)**
| Number | Digit |
|--------|-------|
| 170 | 7 |
| 90 | 9 |
| 802 | 0 |
| 2 | 0 |
| 24 | 2 |
| 45 | 4 |
| 75 | 7 |
| 66 | 6 |

After: `[802, 2, 24, 45, 66, 170, 75, 90]`

**Pass 3: Sort by hundreds digit (exp=100)**
After: `[2, 24, 45, 66, 75, 90, 170, 802]` ✅

## Full Program

```java
package Sorting;

import java.util.Arrays;

class RadixSort {
    public static void main(String[] args) {
        int[] nums = {170, 45, 75, 90, 802, 24, 2, 66};
        
        System.out.println("Before: " + Arrays.toString(nums));
        radixSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void radixSort(int[] nums) {
        int max = Arrays.stream(nums).max().getAsInt();
        
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSortByDigit(nums, exp);
        }
    }
    
    private static void countingSortByDigit(int[] nums, int exp) {
        int n = nums.length;
        int[] output = new int[n];
        int[] count = new int[10];
        
        for (int num : nums) count[(num / exp) % 10]++;
        for (int i = 1; i < 10; i++) count[i] += count[i - 1];
        
        for (int i = n - 1; i >= 0; i--) {
            int digit = (nums[i] / exp) % 10;
            output[count[digit] - 1] = nums[i];
            count[digit]--;
        }
        
        System.arraycopy(output, 0, nums, 0, n);
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time** | O(d × (n + k)) where d = digits, k = base (10) |
| **Space** | O(n + k) |
| **Stable** | ✅ Yes |

If values are up to n^c (polynomial in n), then d = c × log n, and time = O(n log n).  
If values are up to some constant max, time = **O(n)** -truly linear!

## When to Use

| ✅ Use When | ❌ Don't Use When |
|------------|-----------------|
| Fixed-length integers/strings | Variable-length data |
| Known max digits | Very large numbers (many digits) |
| Need linear time for bounded values | Floating point numbers |
| Sorting strings of same length | General comparison needed |

## Handling Negative Numbers

```java
public static void radixSortWithNegatives(int[] nums) {
    // Separate negatives and positives
    List<Integer> negatives = new ArrayList<>();
    List<Integer> positives = new ArrayList<>();
    
    for (int num : nums) {
        if (num < 0) negatives.add(-num);  // Make positive
        else positives.add(num);
    }
    
    // Sort both
    int[] negArr = negatives.stream().mapToInt(i -> i).toArray();
    int[] posArr = positives.stream().mapToInt(i -> i).toArray();
    radixSort(negArr);
    radixSort(posArr);
    
    // Merge: reversed negatives + positives
    int idx = 0;
    for (int i = negArr.length - 1; i >= 0; i--) nums[idx++] = -negArr[i];
    for (int val : posArr) nums[idx++] = val;
}
```

## 🖼️ Infographic Context

**For Napkin AI:** Show the multi-pass process. Original array → sorted by 1s digit → sorted by 10s digit → sorted by 100s digit → fully sorted. Use buckets (0-9) at each pass showing where numbers go. Highlight that STABILITY of each pass is what makes the final result correct.

Image path: `public/infographic/sorting/radix-sort.png`

## Key Interview Points

- **Non-comparison** sort -can be O(n) when digit count is bounded
- Processes digits from **Least Significant to Most Significant** (LSD)
- Requires a **stable** sub-sort (counting sort)
- Time: O(d × n) where d = number of digits
- Used for: sorting integers, fixed-length strings, IP addresses
- Doesn't work directly with negatives or floats (need adaptation)
- Asked as: "Sort n numbers in range 0 to n²" → Radix sort in O(n)
