# Cycle Sort

<iframe src="/infographic/sorting/cycle_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Cycle Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void cycleSort(int[] nums) {
    int n = nums.length;
    
    for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        int item = nums[cycleStart];
        
        // Find position: count elements smaller than item
        int pos = cycleStart;
        for (int i = cycleStart + 1; i < n; i++) {
            if (nums[i] < item) pos++;
        }
        
        if (pos == cycleStart) continue;  // Already in correct position
        
        // Skip duplicates
        while (item == nums[pos]) pos++;
        
        // Place item at correct position
        int temp = nums[pos];
        nums[pos] = item;
        item = temp;
        
        // Rotate rest of the cycle
        while (pos != cycleStart) {
            pos = cycleStart;
            for (int i = cycleStart + 1; i < n; i++) {
                if (nums[i] < item) pos++;
            }
            
            while (item == nums[pos]) pos++;
            
            temp = nums[pos];
            nums[pos] = item;
            item = temp;
        }
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 4 | `for (int cycleStart = 0; ...)` | Try each position as a cycle start. |
| 5 | `int item = nums[cycleStart];` | The element that needs to find its correct position. |
| 8 | `int pos = cycleStart;` | Will become the correct position for `item`. |
| 9 | `for (...) if (nums[i] < item) pos++;` | Count how many elements are smaller → that's the correct index. |
| 12 | `if (pos == cycleStart) continue;` | Element is already where it should be. No cycle. |
| 15 | `while (item == nums[pos]) pos++;` | Handle duplicates -skip past equal elements. |
| 18-20 | Swap item into correct position | Place `item` at `pos`, take displaced element as new `item`. |
| 23 | `while (pos != cycleStart)` | Follow the cycle until we return to where we started. |
| 24-32 | Repeat: find position, place element | Each displaced element gets placed at its correct position. |

## Why "Cycle" Sort?

Every permutation can be decomposed into **cycles**. Cycle sort follows these cycles.

```
Array:  [4, 3, 1, 2]
Sorted: [1, 2, 3, 4]

Cycle 1: 4→pos3, 2→pos1, 3→pos2, 1→pos0 → back to start!
One cycle handles 4 elements with only 3 writes (minimum possible).
```

## Key Property: Minimum Writes

| Sort | Writes | 
|------|--------|
| Bubble Sort | O(n²) swaps |
| Selection Sort | O(n) swaps |
| **Cycle Sort** | **Minimum possible writes** |

> Each element is written **at most once** to its final position. This is theoretically optimal!

## Full Program

```java
package Sorting;

import java.util.Arrays;

class CycleSort {
    public static void main(String[] args) {
        int[] nums = {4, 3, 2, 1, 5};
        
        System.out.println("Before: " + Arrays.toString(nums));
        cycleSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void cycleSort(int[] nums) {
        int n = nums.length;
        
        for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {
            int item = nums[cycleStart];
            int pos = cycleStart;
            
            for (int i = cycleStart + 1; i < n; i++) {
                if (nums[i] < item) pos++;
            }
            
            if (pos == cycleStart) continue;
            while (item == nums[pos]) pos++;
            
            int temp = nums[pos];
            nums[pos] = item;
            item = temp;
            
            while (pos != cycleStart) {
                pos = cycleStart;
                for (int i = cycleStart + 1; i < n; i++) {
                    if (nums[i] < item) pos++;
                }
                while (item == nums[pos]) pos++;
                temp = nums[pos];
                nums[pos] = item;
                item = temp;
            }
        }
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(n²) -always counts smaller elements |
| **Time (Average)** | O(n²) |
| **Time (Worst)** | O(n²) |
| **Space** | O(1) -in-place |
| **Stable** | ❌ No |
| **Writes** | O(n) -**minimum possible!** |

## When to Use

| Scenario | Why Cycle Sort |
|----------|---------------|
| **Flash memory / EEPROM** | Limited write cycles → minimize writes |
| **SSD lifespan** | Fewer writes = longer life |
| **Counting minimum swaps** | Cycle sort naturally counts cycles |
| **Interview: "minimum swaps to sort"** | Answer = n - (number of cycles) |

## Interview Pattern: Minimum Swaps to Sort

```java
// LeetCode pattern: find minimum swaps to sort an array
public static int minSwaps(int[] nums) {
    int n = nums.length;
    int[][] arrWithIndex = new int[n][2];
    for (int i = 0; i < n; i++) arrWithIndex[i] = new int[]{nums[i], i};
    
    Arrays.sort(arrWithIndex, (a, b) -> a[0] - b[0]);
    
    boolean[] visited = new boolean[n];
    int swaps = 0;
    
    for (int i = 0; i < n; i++) {
        if (visited[i] || arrWithIndex[i][1] == i) continue;
        
        int cycleSize = 0;
        int j = i;
        while (!visited[j]) {
            visited[j] = true;
            j = arrWithIndex[j][1];
            cycleSize++;
        }
        
        swaps += (cycleSize - 1);  // Each cycle of size k needs k-1 swaps
    }
    
    return swaps;
}
```

## 🖼️ Infographic Context

**For Napkin AI:** Show a permutation cycle: element A goes to position of B, B goes to position of C, C goes back to position of A. Show that following a cycle places each element exactly once (minimum writes). Compare write counts: bubble sort (many writes) vs cycle sort (minimum writes). Show real-world use case: flash memory with limited write endurance.

Image path: `public/infographic/sorting/cycle-sort.png`

## Key Interview Points

- **Minimum memory writes** of any sorting algorithm -each element written at most once
- O(n²) time -slow, but optimal for minimizing writes
- Use when writes are expensive (flash memory, SSD, network)
- **"Minimum swaps to sort"** = n - (number of cycles in the permutation)
- Not practical for general sorting (O(n²)), but the cycle concept is crucial for interviews
