# Exponential Search

<iframe src="/infographic/searching/exponential_search_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Exponential Search Interactive Visualization"></iframe>

## Function Code

```java
public static int exponentialSearch(int[] nums, int target) {
    int n = nums.length;
    
    if (nums[0] == target) return 0;
    
    // Find range: double i until nums[i] >= target
    int i = 1;
    while (i < n && nums[i] <= target) {
        i *= 2;
    }
    
    // Binary search within found range [i/2, min(i, n-1)]
    return binarySearch(nums, target, i / 2, Math.min(i, n - 1));
}

private static int binarySearch(int[] nums, int target, int low, int high) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static int exponentialSearch(int[] nums, int target)` | Takes a **sorted** array and target value. |
| 4 | `if (nums[0] == target) return 0;` | Quick check: if target is first element, return immediately. |
| 7 | `int i = 1;` | Start probing from index 1. |
| 8 | `while (i < n && nums[i] <= target)` | Double the index each iteration. Stop when we overshoot or go out of bounds. |
| 9 | `i *= 2;` | Exponential jump: 1 → 2 → 4 → 8 → 16 → 32... This finds the range in O(log n). |
| 13 | `return binarySearch(nums, target, i / 2, Math.min(i, n - 1));` | Target is in range `[i/2, i]`. Binary search this smaller range. `Math.min(i, n-1)` prevents out-of-bounds. |

## How It Works (Two Phases)

```
Phase 1: Find the range (exponential jumps)
Array:  [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
Index:   0  1  2  3   4   5   6   7   8   9  10  11  12  13  14

Target: 22
i = 1  → nums[1] = 4  ≤ 22 → continue
i = 2  → nums[2] = 6  ≤ 22 → continue
i = 4  → nums[4] = 10 ≤ 22 → continue
i = 8  → nums[8] = 18 ≤ 22 → continue
i = 16 → 16 > n, stop!

Phase 2: Binary search in range [8, 14]
→ finds 22 at index 10 ✅
```

## Full Program

```java
package Searching;

class ExponentialSearch {
    public static void main(String[] args) {
        int[] nums = {2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30};
        
        int index = exponentialSearch(nums, 22);
        
        if (index == -1) {
            System.out.println("Not found");
        } else {
            System.out.println("Found at index " + index);
        }
    }
    
    public static int exponentialSearch(int[] nums, int target) {
        int n = nums.length;
        
        if (nums[0] == target) return 0;
        
        int i = 1;
        while (i < n && nums[i] <= target) {
            i *= 2;
        }
        
        return binarySearch(nums, target, i / 2, Math.min(i, n - 1));
    }
    
    private static int binarySearch(int[] nums, int target, int low, int high) {
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(1) -target is at index 0 or 1 |
| **Time (Average)** | O(log n) -same as binary search |
| **Time (Worst)** | O(log n) -log n for range finding + log n for binary search |
| **Space** | O(1) |

## When to Use

| Scenario | Why Exponential Search |
|----------|----------------------|
| **Unbounded/infinite arrays** | Don't know the size → can't set `high` for binary search |
| **Target is near the beginning** | Only searches range [0, 2^k] where 2^k ≈ target position |
| **Sorted linked list** | Find range, then search within |

## Key Advantage: Unbounded Search

```java
// When you don't know array size (or it's "infinite")
public static int unboundedSearch(int[] nums, int target) {
    int i = 1;
    // Find upper bound
    while (nums[i] < target) {
        i *= 2;
    }
    if (nums[i] == target) return i;
    // Binary search in [i/2, i]
    return binarySearch(nums, target, i / 2, i);
}
```

## Comparison with Binary Search

| Feature | Binary Search | Exponential Search |
|---------|--------------|-------------------|
| Array size known | ✅ Required | ❌ Not required |
| Complexity | O(log n) | O(log n) |
| Target near start | Checks middle first | Finds quickly (small range) |
| Unbounded arrays | ❌ Can't use | ✅ Perfect fit |

## 🖼️ Infographic Context

**For Napkin AI:** Show two phases visually. Phase 1: arrows jumping exponentially (1, 2, 4, 8, 16...) over a sorted array until overshoot. Phase 2: a binary search zooming into the identified range. Highlight that the range found is at most 2x the target's position.

Image path: `public/infographic/searching/exponential-search.png`

## Key Interview Points

- Combines **exponential range-finding** + **binary search**
- Best for **unbounded/infinite sorted arrays** (classic interview question!)
- O(log i) where i is target's position -better than O(log n) when target is near start
- Asked as: "Search in a sorted array of unknown size" or "Search in infinite array"
