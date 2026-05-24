# Bitonic Sort

<iframe src="/infographic/sorting/bitonic_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Bitonic Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void bitonicSort(int[] nums, int low, int count, boolean ascending) {
    if (count > 1) {
        int mid = count / 2;

        // Sort first half in ascending order
        bitonicSort(nums, low, mid, true);

        // Sort second half in descending order
        bitonicSort(nums, low + mid, mid, false);

        // Merge entire sequence in given direction
        bitonicMerge(nums, low, count, ascending);
    }
}

private static void bitonicMerge(int[] nums, int low, int count, boolean ascending) {
    if (count > 1) {
        int mid = count / 2;

        for (int i = low; i < low + mid; i++) {
            if (ascending == (nums[i] > nums[i + mid])) {
                int temp = nums[i];
                nums[i] = nums[i + mid];
                nums[i + mid] = temp;
            }
        }

        bitonicMerge(nums, low, mid, ascending);
        bitonicMerge(nums, low + mid, mid, ascending);
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void bitonicSort(int[] nums, int low, int count, boolean ascending)` | Sorts `count` elements starting at `low`. `ascending` controls sort direction. |
| 2 | `if (count > 1)` | Base case: single element is trivially bitonic. |
| 3 | `int mid = count / 2` | Split sequence in half. **Requires power-of-2 size.** |
| 6 | `bitonicSort(nums, low, mid, true)` | Recursively sort first half ascending ↑ |
| 9 | `bitonicSort(nums, low + mid, mid, false)` | Recursively sort second half descending ↓ |
| 12 | `bitonicMerge(nums, low, count, ascending)` | Merge: first half ↑ + second half ↓ = bitonic sequence → sort it. |
| 16 | `private static void bitonicMerge(...)` | Merges a bitonic sequence into sorted order. |
| 18 | `int mid = count / 2` | Compare elements that are `mid` apart. |
| 20-24 | `if (ascending == (nums[i] > nums[i + mid]))` | Swap if pair is in wrong order for desired direction. |
| 27-28 | Recursive merge calls | Both halves are now bitonic -merge them recursively. |

## How It Works (Bitonic Sequences)

```
A "bitonic sequence" first increases then decreases (or vice versa).
Example: [1, 4, 7, 8, 5, 3, 2] -increases to 8, then decreases.

Strategy:
1. Build bitonic sequence by sorting halves in opposite directions
2. Merge bitonic sequence into fully sorted order

Visual (8 elements):
                          [3, 7, 4, 8, 6, 2, 1, 5]

  Sort ↑: [3, 7, 4, 8]              Sort ↓: [6, 2, 1, 5]
       ↑:[3,7] ↓:[4,8]                  ↑:[6,2] ↓:[1,5]
       [3,7]   [8,4]                     [2,6]   [5,1]
       merge→[3,4,7,8]                   merge→[6,5,2,1]

  Bitonic: [3, 4, 7, 8, 6, 5, 2, 1]  (↑ then ↓)
  Bitonic Merge (ascending):
    Compare pairs distance 4 apart:
      3<6✓  4<5✓  7>2→swap  8>1→swap
    → [3, 4, 2, 1, 6, 5, 7, 8]
    Merge each half recursively...
    → [1, 2, 3, 4, 5, 6, 7, 8] ✅
```

## Full Program

```java
package Sorting;

import java.util.Arrays;

class BitonicSort {
    public static void main(String[] args) {
        int[] nums = {3, 7, 4, 8, 6, 2, 1, 5}; // Size must be power of 2
        System.out.println("Before: " + Arrays.toString(nums));

        bitonicSort(nums, 0, nums.length, true);

        System.out.println("After:  " + Arrays.toString(nums));
    }

    public static void bitonicSort(int[] nums, int low, int count, boolean ascending) {
        if (count > 1) {
            int mid = count / 2;

            bitonicSort(nums, low, mid, true);
            bitonicSort(nums, low + mid, mid, false);
            bitonicMerge(nums, low, count, ascending);
        }
    }

    private static void bitonicMerge(int[] nums, int low, int count, boolean ascending) {
        if (count > 1) {
            int mid = count / 2;

            for (int i = low; i < low + mid; i++) {
                if (ascending == (nums[i] > nums[i + mid])) {
                    int temp = nums[i];
                    nums[i] = nums[i + mid];
                    nums[i + mid] = temp;
                }
            }

            bitonicMerge(nums, low, mid, ascending);
            bitonicMerge(nums, low + mid, mid, ascending);
        }
    }
}
```

## Dry Run

```
Input: nums = [3, 7, 4, 8, 6, 2, 1, 5], ascending=true

bitonicSort(0, 8, ↑)
├── bitonicSort(0, 4, ↑)
│   ├── bitonicSort(0, 2, ↑)
│   │   ├── bitonicSort(0, 1, ↑) → base case
│   │   ├── bitonicSort(1, 1, ↓) → base case
│   │   └── bitonicMerge(0, 2, ↑): [3,7] → compare 3<7 ✓ → [3,7]
│   ├── bitonicSort(2, 2, ↓)
│   │   ├── bitonicSort(2, 1, ↑) → base case
│   │   ├── bitonicSort(3, 1, ↓) → base case
│   │   └── bitonicMerge(2, 2, ↓): [4,8] → 4<8, want ↓ → swap → [8,4]
│   └── bitonicMerge(0, 4, ↑): [3,7,8,4]
│       Compare pairs (dist=2): 3<8✓, 7>4→swap → [3,4,8,7]
│       bitonicMerge(0,2,↑): [3,4] → 3<4✓ → [3,4]
│       bitonicMerge(2,2,↑): [8,7] → 8>7→swap → [7,8]
│       Result: [3,4,7,8]
│
├── bitonicSort(4, 4, ↓)
│   ├── bitonicSort(4, 2, ↑)
│   │   └── bitonicMerge(4, 2, ↑): [6,2] → 6>2→swap → [2,6]
│   ├── bitonicSort(6, 2, ↓)
│   │   └── bitonicMerge(6, 2, ↓): [1,5] → 1<5, want ↓ → swap → [5,1]
│   └── bitonicMerge(4, 4, ↓): [2,6,5,1]
│       Compare pairs (dist=2): 2<5 want↓→swap, 6>1 want↓→✓ → [5,6,2,1]
│       bitonicMerge(4,2,↓): [5,6] → 5<6 want↓→swap → [6,5]
│       bitonicMerge(6,2,↓): [2,1] → 2>1✓ → [2,1]
│       Result: [6,5,2,1]
│
└── bitonicMerge(0, 8, ↑): [3,4,7,8,6,5,2,1]
    Compare pairs (dist=4): 3<6✓, 4<5✓, 7>2→swap, 8>1→swap
    → [3,4,2,1,6,5,7,8]
    bitonicMerge(0,4,↑): [3,4,2,1]
      Compare (dist=2): 3>2→swap, 4>1→swap → [2,1,3,4]
      bitonicMerge(0,2,↑): [2,1]→swap→[1,2]
      bitonicMerge(2,2,↑): [3,4]→✓
      → [1,2,3,4]
    bitonicMerge(4,4,↑): [6,5,7,8]
      Compare (dist=2): 6<7✓, 5<8✓ → [6,5,7,8]
      bitonicMerge(4,2,↑): [6,5]→swap→[5,6]
      bitonicMerge(6,2,↑): [7,8]→✓
      → [5,6,7,8]

Output: [1, 2, 3, 4, 5, 6, 7, 8]
```

## Complexity Analysis

| Metric | Value |
|--------|-------|
| **Time Complexity** | O(n log² n) |
| **Space Complexity** | O(log² n) -recursion stack |
| **Best Case** | O(n log² n) -no adaptive behavior |
| **Worst Case** | O(n log² n) -same regardless of input |
| **Comparisons** | (n/2) × log² n |

## When to Use

| Scenario | Recommendation |
|----------|---------------|
| Parallel/GPU sorting | ✅ Bitonic Sort -highly parallelizable |
| Hardware sorting networks | ✅ Bitonic Sort |
| Fixed comparison pattern needed | ✅ Bitonic Sort -data-oblivious |
| Variable-size arrays | ❌ Requires power-of-2 size (or padding) |
| Sequential single-threaded | ❌ Merge/quick sort are faster |
| Stability required | ❌ Not stable |

## Key Interview Points

1. **Parallel-friendly**: All comparisons at each level are independent -perfect for GPU/SIMD
2. **Data-oblivious**: Comparison pattern doesn't depend on data values -useful for security (no timing attacks)
3. **Sorting network**: Can be implemented as a fixed hardware circuit
4. **Power-of-2 requirement**: Standard version requires array size = 2^k (pad with ∞ otherwise)
5. **O(n log² n)**: Slower than O(n log n) algorithms sequentially, but massive parallelism compensates
6. **Bitonic sequence property**: A sequence that first increases then decreases can be sorted by comparing elements `n/2` apart
