# Ternary Search

<iframe src="/infographic/searching/ternary_search_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Ternary Search Interactive Visualization"></iframe>

## Function Code

```java
public static int ternarySearch(int[] nums, int target) {
    int low = 0;
    int high = nums.length - 1;
    
    while (low <= high) {
        int mid1 = low + (high - low) / 3;
        int mid2 = high - (high - low) / 3;
        
        if (nums[mid1] == target) return mid1;
        if (nums[mid2] == target) return mid2;
        
        if (target < nums[mid1]) {
            high = mid1 - 1;
        } else if (target > nums[mid2]) {
            low = mid2 + 1;
        } else {
            low = mid1 + 1;
            high = mid2 - 1;
        }
    }
    
    return -1;
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static int ternarySearch(int[] nums, int target)` | Takes a **sorted** array and target. Divides into **3 parts** instead of 2. |
| 2-3 | `int low = 0; int high = nums.length - 1;` | Initialize search boundaries. |
| 5 | `while (low <= high)` | Continue while valid search space exists. |
| 6 | `int mid1 = low + (high - low) / 3;` | First partition point -1/3 of the way. |
| 7 | `int mid2 = high - (high - low) / 3;` | Second partition point -2/3 of the way. |
| 9 | `if (nums[mid1] == target) return mid1;` | Check first partition point. |
| 10 | `if (nums[mid2] == target) return mid2;` | Check second partition point. |
| 12 | `if (target < nums[mid1])` | Target is in **first third** [low, mid1-1]. |
| 13 | `high = mid1 - 1;` | Eliminate right 2/3. |
| 14 | `else if (target > nums[mid2])` | Target is in **last third** [mid2+1, high]. |
| 15 | `low = mid2 + 1;` | Eliminate left 2/3. |
| 16-18 | `else { low = mid1+1; high = mid2-1; }` | Target is in **middle third** [mid1+1, mid2-1]. |

## Dry Run

Array: `[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]`, Target: `13`

| Step | low | high | mid1 | mid2 | nums[mid1] | nums[mid2] | Action |
|------|-----|------|------|------|------------|------------|--------|
| 1 | 0 | 9 | 3 | 6 | 7 | 13 | nums[mid2]==13 → Found! ✅ |

## Full Program

```java
package Searching;

class TernarySearch {
    public static void main(String[] args) {
        int[] nums = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        
        int index = ternarySearch(nums, 13);
        
        if (index == -1) {
            System.out.println("Not found");
        } else {
            System.out.println("Found at index " + index);
        }
    }
    
    public static int ternarySearch(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        
        while (low <= high) {
            int mid1 = low + (high - low) / 3;
            int mid2 = high - (high - low) / 3;
            
            if (nums[mid1] == target) return mid1;
            if (nums[mid2] == target) return mid2;
            
            if (target < nums[mid1]) {
                high = mid1 - 1;
            } else if (target > nums[mid2]) {
                low = mid2 + 1;
            } else {
                low = mid1 + 1;
                high = mid2 - 1;
            }
        }
        
        return -1;
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(1) -target at one of the partition points |
| **Time (Average)** | O(log₃ n) |
| **Time (Worst)** | O(log₃ n) |
| **Space** | O(1) |

## Ternary vs Binary Search

| Aspect | Binary Search | Ternary Search |
|--------|--------------|----------------|
| Divisions per step | 2 parts | 3 parts |
| Comparisons per step | 1-2 | 2-4 |
| Steps needed | log₂ n | log₃ n |
| **Total comparisons** | **2 log₂ n** | **4 log₃ n ≈ 2.52 log₂ n** |
| Winner | ✅ **Fewer comparisons** | ❌ More comparisons overall |

> **Surprise:** Binary search is actually **faster** in practice! Ternary search reduces steps but increases comparisons per step. Net effect: binary search wins.

## When Ternary Search IS Useful

### Finding Maximum/Minimum of Unimodal Function

```java
// Find maximum of a function that increases then decreases (unimodal)
public static double ternarySearchMax(double low, double high) {
    double eps = 1e-9;
    
    while (high - low > eps) {
        double mid1 = low + (high - low) / 3;
        double mid2 = high - (high - low) / 3;
        
        if (f(mid1) < f(mid2)) {
            low = mid1;     // Maximum is in [mid1, high]
        } else {
            high = mid2;    // Maximum is in [low, mid2]
        }
    }
    
    return (low + high) / 2;
}
```

> **This is the real use case!** Ternary search shines for optimization on unimodal functions where binary search can't be applied directly.

## 🖼️ Infographic Context

**For Napkin AI:** Show array divided into 3 equal segments with two partition points (mid1, mid2). Show the 3 possible outcomes: target in left third, middle third, or right third. Also show comparison with binary search -binary divides in 2, ternary in 3, but binary needs fewer total comparisons. Include a unimodal curve showing where ternary search for peak/valley is useful.

Image path: `public/infographic/searching/ternary-search.png`

## Key Interview Points

- Divides into **3 parts** instead of 2
- **NOT faster** than binary search for sorted arrays (more comparisons)
- **Real use case:** finding max/min of unimodal functions
- Asked in competitive programming, rarely in standard interviews
- Good to know the trade-off: fewer iterations ≠ fewer comparisons
