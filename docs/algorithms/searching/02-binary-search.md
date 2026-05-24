# Binary Search

<iframe src="/infographic/searching/binary_search_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Binary Search Interactive Visualization"></iframe>

## Function Code

```java
public static int binarySearch(int[] nums, int target) {
    int low = 0;
    int high = nums.length - 1;
    
    while (low <= high) {
        int middle = low + (high - low) / 2;
        
        if (nums[middle] > target) high = middle - 1;
        else if (nums[middle] < target) low = middle + 1;
        else return middle;
    }
    
    return -1;
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static int binarySearch(int[] nums, int target)` | Takes a **sorted** array and target. Returns index or -1. |
| 2 | `int low = 0;` | Left boundary pointer -starts at beginning of search space. |
| 3 | `int high = nums.length - 1;` | Right boundary pointer -starts at end of search space. |
| 5 | `while (low <= high)` | Continue while search space is valid. `<=` because single element is still valid. |
| 6 | `int middle = low + (high - low) / 2;` | Calculate mid-point. Using `low + (high-low)/2` instead of `(low+high)/2` to **prevent integer overflow**. |
| 8 | `if (nums[middle] > target)` | Mid element is too large → target must be in **left half**. |
| 8 | `high = middle - 1;` | Shrink search space to left. Exclude middle (already checked). |
| 9 | `else if (nums[middle] < target)` | Mid element is too small → target must be in **right half**. |
| 9 | `low = middle + 1;` | Shrink search space to right. Exclude middle. |
| 10 | `else return middle;` | `nums[middle] == target` → found it! Return index. |
| 13 | `return -1;` | Search space exhausted (`low > high`), target not in array. |

## Full Program

```java
package Searching;

class BinarySearch {
    public static void main(String[] args) {
        int[] nums = {10, 20, 30, 40, 50, 60, 70, 80, 89, 100};
        
        int index = binarySearch(nums, 89);
        
        if (index == -1) {
            System.out.println("Not found");
        } else {
            System.out.println("Found at index " + index);
        }
    }
    
    public static int binarySearch(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        
        while (low <= high) {
            int middle = low + (high - low) / 2;
            
            if (nums[middle] > target) high = middle - 1;
            else if (nums[middle] < target) low = middle + 1;
            else return middle;
        }
        
        return -1;
    }
}
```

## Dry Run

Array: `[10, 20, 30, 40, 50, 60, 70, 80, 89, 100]`, Target: `89`

| Step | low | high | middle | nums[middle] | Action |
|------|-----|------|--------|--------------|--------|
| 1 | 0 | 9 | 4 | 50 | 50 < 89 → low = 5 |
| 2 | 5 | 9 | 7 | 80 | 80 < 89 → low = 8 |
| 3 | 8 | 9 | 8 | 89 | 89 == 89 → return 8 ✅ |

> Only **3 comparisons** instead of 9 (linear). That's the power of O(log n).

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(1) -target is at middle |
| **Time (Average)** | O(log n) -halving each time |
| **Time (Worst)** | O(log n) -target at boundary or not found |
| **Space** | O(1) -iterative version uses no extra space |

## Why `low + (high - low) / 2`?

```
If low = 2,000,000,000 and high = 2,000,000,000
(low + high) = 4,000,000,000  → OVERFLOW (exceeds Integer.MAX_VALUE = 2,147,483,647)
low + (high - low) / 2 = 2,000,000,000 + 0 = 2,000,000,000  → SAFE ✅
```

## Variations

### Recursive Binary Search

```java
public static int binarySearchRecursive(int[] nums, int target, int low, int high) {
    if (low > high) return -1;
    
    int middle = low + (high - low) / 2;
    
    if (nums[middle] == target) return middle;
    else if (nums[middle] > target) return binarySearchRecursive(nums, target, low, middle - 1);
    else return binarySearchRecursive(nums, target, middle + 1, high);
}
```

> Space: O(log n) due to recursion stack.

### Lower Bound (First Occurrence)

```java
public static int lowerBound(int[] nums, int target) {
    int low = 0, high = nums.length - 1;
    int result = -1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) {
            result = mid;       // Record answer
            high = mid - 1;     // Keep searching left for first occurrence
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}
```

### Upper Bound (Last Occurrence)

```java
public static int upperBound(int[] nums, int target) {
    int low = 0, high = nums.length - 1;
    int result = -1;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) {
            result = mid;       // Record answer
            low = mid + 1;      // Keep searching right for last occurrence
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}
```

### Binary Search on Answer (Pattern)

```java
// Example: Find minimum capacity to ship packages in D days
public static int shipWithinDays(int[] weights, int days) {
    int low = Arrays.stream(weights).max().getAsInt();  // Min possible answer
    int high = Arrays.stream(weights).sum();            // Max possible answer
    
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (canShip(weights, days, mid)) {
            high = mid;         // Try smaller capacity
        } else {
            low = mid + 1;      // Need bigger capacity
        }
    }
    return low;
}
```

## Common Pitfalls

| Mistake | Why it's wrong |
|---------|---------------|
| `while (low < high)` | Misses single-element case. Use `<=` for standard binary search. |
| `mid = (low + high) / 2` | Integer overflow for large arrays. |
| `high = mid` / `low = mid` | Infinite loop! Always use `mid - 1` or `mid + 1`. |
| Using on unsorted array | Binary search **requires sorted input**. |


## Key Interview Points

- **Prerequisite:** Array MUST be sorted
- Most frequently asked algorithm in interviews
- Pattern: "Search in sorted array" = Binary Search
- Used in: rotated array, matrix search, peak finding, capacity problems
- **Binary Search on Answer:** When answer space is monotonic (if X works, X+1 also works)
- Know all 3 variations: standard, lower bound, upper bound
