# Linear Search

<iframe src="/infographic/searching/linear_search_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Linear Search Interactive Visualization"></iframe>

## Function Code

```java
public static int linearSearch(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == target) {
            return i;
        }
    }
    return -1;
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static int linearSearch(int[] nums, int target)` | Takes an array and target value. Returns index if found, -1 if not. |
| 2 | `for (int i = 0; i < nums.length; i++)` | Start from index 0, traverse every element one by one until end. |
| 3 | `if (nums[i] == target)` | Compare current element with target. |
| 4 | `return i;` | If match found, immediately return the index. No need to check further. |
| 6 | `return -1;` | If loop finishes without finding, target doesn't exist in array. |

## Full Program

```java
package Searching;

class LinearSearch {
    public static void main(String[] args) {
        int[] nums = {5, 12, 8, 3, 17, 42, 9};
        
        int index = linearSearch(nums, 17);
        
        if (index == -1) {
            System.out.println("Not found");
        } else {
            System.out.println("Found at index " + index);
        }
    }
    
    public static int linearSearch(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(1) -target is first element |
| **Time (Average)** | O(n) -target is somewhere in the middle |
| **Time (Worst)** | O(n) -target is last or not present |
| **Space** | O(1) -no extra space used |

## When to Use

- Array is **unsorted** (can't use binary search)
- Array is **small** (overhead of other searches isn't worth it)
- You need to find **all occurrences** (modify to not return early)
- **Linked list** traversal (no random access)

## Variations

### Find All Occurrences

```java
public static List<Integer> linearSearchAll(int[] nums, int target) {
    List<Integer> indices = new ArrayList<>();
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == target) {
            indices.add(i);
        }
    }
    return indices;
}
```

### Sentinel Linear Search (Optimization)

```java
public static int sentinelSearch(int[] nums, int target) {
    int n = nums.length;
    int last = nums[n - 1];   // Save last element
    nums[n - 1] = target;     // Place sentinel
    
    int i = 0;
    while (nums[i] != target) {
        i++;
    }
    
    nums[n - 1] = last;       // Restore last element
    
    if (i < n - 1 || nums[n - 1] == target) {
        return i;
    }
    return -1;
}
```

> **Why sentinel?** Removes the bounds check `i < nums.length` from the loop, saving one comparison per iteration.

## Key Interview Points

- Simplest search algorithm -everyone should know it
- Works on **unsorted** arrays (unlike binary search)
- O(n) is often acceptable for small inputs
- Asked as: "Search in unsorted array" or "Find element in linked list"
