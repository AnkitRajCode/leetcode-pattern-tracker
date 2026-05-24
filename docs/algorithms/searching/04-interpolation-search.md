# Interpolation Search

<iframe src="/infographic/searching/interpolation_search_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Interpolation Search Interactive Visualization"></iframe>

## Function Code

```java
public static int interpolationSearch(int[] nums, int target) {
    int low = 0;
    int high = nums.length - 1;
    
    while (low <= high && target >= nums[low] && target <= nums[high]) {
        if (low == high) {
            if (nums[low] == target) return low;
            return -1;
        }
        
        int pos = low + ((target - nums[low]) * (high - low)) / (nums[high] - nums[low]);
        
        if (nums[pos] == target) return pos;
        else if (nums[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    
    return -1;
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static int interpolationSearch(int[] nums, int target)` | Takes a **sorted, uniformly distributed** array and target. |
| 2-3 | `int low = 0; int high = nums.length - 1;` | Initialize boundaries like binary search. |
| 5 | `while (low <= high && target >= nums[low] && target <= nums[high])` | Extra conditions: target must be within current range. If target < min or > max, it can't exist. |
| 6-8 | `if (low == high) { ... }` | Edge case: single element left. Check and return. |
| 11 | `int pos = low + ((target - nums[low]) * (high - low)) / (nums[high] - nums[low]);` | **The magic formula.** Instead of always going to middle, estimate position based on target's value relative to range. Like finding a word in a dictionary -you don't start in the middle for "A". |
| 13 | `if (nums[pos] == target) return pos;` | Found target at estimated position. |
| 14 | `else if (nums[pos] < target) low = pos + 1;` | Estimate was too low → search right. |
| 15 | `else high = pos - 1;` | Estimate was too high → search left. |
| 18 | `return -1;` | Target not in array. |

## The Formula Explained

```
pos = low + ((target - nums[low]) * (high - low)) / (nums[high] - nums[low])
              ─────────────────────────────────────────────────────────────
              │         │                    │                │
              │    how far target is     range of indices    range of values
              │    from min value
              │
              start position
```

**Intuition:** If array is `[10, 20, 30, 40, 50]` and target is `40`:
- target is 75% of the way between 10 and 50
- So check position at 75% of the array → index 3
- nums[3] = 40 ✅ Found in **1 step**!

Binary search would need 2-3 steps for the same.

## Full Program

```java
package Searching;

class InterpolationSearch {
    public static void main(String[] args) {
        int[] nums = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
        
        int index = interpolationSearch(nums, 70);
        
        if (index == -1) {
            System.out.println("Not found");
        } else {
            System.out.println("Found at index " + index);
        }
    }
    
    public static int interpolationSearch(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        
        while (low <= high && target >= nums[low] && target <= nums[high]) {
            if (low == high) {
                if (nums[low] == target) return low;
                return -1;
            }
            
            int pos = low + ((target - nums[low]) * (high - low)) / (nums[high] - nums[low]);
            
            if (nums[pos] == target) return pos;
            else if (nums[pos] < target) low = pos + 1;
            else high = pos - 1;
        }
        
        return -1;
    }
}
```

## Dry Run

Array: `[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]`, Target: `70`

| Step | low | high | Formula | pos | nums[pos] | Action |
|------|-----|------|---------|-----|-----------|--------|
| 1 | 0 | 9 | 0 + (70-10)*(9-0)/(100-10) = 0 + 60*9/90 = 6 | 6 | 70 | 70 == 70 → Found! ✅ |

> **1 comparison** vs Binary Search needing 3-4. That's O(log log n) in action!

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(1) -target found on first probe |
| **Time (Average)** | O(log log n) -for uniformly distributed data |
| **Time (Worst)** | O(n) -exponentially distributed data (e.g., [1, 2, 4, 8, 16, ...]) |
| **Space** | O(1) |

## When to Use vs Binary Search

| Data Distribution | Best Algorithm |
|-------------------|----------------|
| Uniformly distributed (evenly spaced) | **Interpolation Search** -O(log log n) |
| Unknown/non-uniform distribution | **Binary Search** -O(log n) guaranteed |
| Exponential/skewed distribution | **Binary Search** -interpolation degrades to O(n) |

## Pitfalls

| Issue | Solution |
|-------|----------|
| Division by zero when `nums[high] == nums[low]` | The `low == high` check handles this |
| Integer overflow in formula | Use `long` for intermediate calculations |
| Non-uniform data → O(n) | Fall back to binary search |
| Doesn't work with duplicates well | Use binary search for duplicate arrays |

## 🖼️ Infographic Context

**For Napkin AI:** Show a number line with a sorted array. Instead of always probing the middle (like binary search), show an arrow probing at a position proportional to the target value. Compare side-by-side: binary search going to middle vs interpolation search going to estimated position. Show "dictionary analogy" -searching for 'W' in a dictionary, you open near the end, not the middle.

Image path: `public/infographic/searching/interpolation-search.png`

## Key Interview Points

- Like binary search but **smarter probe position**
- Requires **sorted + uniformly distributed** data
- O(log log n) for uniform data -significantly faster than binary search
- Real-world analogy: how humans search dictionaries/phone books
- Falls back to O(n) for skewed data -know when NOT to use it
