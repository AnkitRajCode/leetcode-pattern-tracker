# Bucket Sort

<iframe src="/infographic/sorting/bucket_sort_interactive_infographic.html" width="100%" height="520" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;" title="Bucket Sort Interactive Visualization"></iframe>

## Function Code

```java
public static void bucketSort(float[] nums) {
    int n = nums.length;
    if (n <= 0) return;
    
    // Create n empty buckets
    List<List<Float>> buckets = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        buckets.add(new ArrayList<>());
    }
    
    // Distribute elements into buckets
    for (float num : nums) {
        int bucketIndex = (int) (num * n);  // For values in [0, 1)
        buckets.get(bucketIndex).add(num);
    }
    
    // Sort individual buckets
    for (List<Float> bucket : buckets) {
        Collections.sort(bucket);  // Insertion sort for small buckets
    }
    
    // Concatenate all buckets
    int idx = 0;
    for (List<Float> bucket : buckets) {
        for (float val : bucket) {
            nums[idx++] = val;
        }
    }
}
```

## Line-by-Line Explanation

| Line | Code | Explanation |
|------|------|-------------|
| 1 | `public static void bucketSort(float[] nums)` | Best for uniformly distributed floating-point values in [0, 1). |
| 6-8 | Create `n` empty buckets | Each bucket will hold a subrange of values. |
| 12 | `int bucketIndex = (int) (num * n);` | Map value to bucket. E.g., n=10: value 0.35 → bucket 3. Value 0.78 → bucket 7. Spreads values evenly. |
| 13 | `buckets.get(bucketIndex).add(num);` | Place element in its bucket. |
| 17 | `Collections.sort(bucket);` | Sort each bucket individually. With uniform distribution, each bucket has ~1 element → O(1) per bucket. |
| 21-24 | Concatenate buckets in order | Bucket 0's elements < bucket 1's elements < ... → sorted! |

## For Integer Arrays (General Version)

```java
public static void bucketSort(int[] nums) {
    int n = nums.length;
    int max = Arrays.stream(nums).max().getAsInt();
    int min = Arrays.stream(nums).min().getAsInt();
    
    int bucketCount = (int) Math.sqrt(n);  // √n buckets
    int bucketRange = (max - min) / bucketCount + 1;
    
    List<List<Integer>> buckets = new ArrayList<>();
    for (int i = 0; i <= bucketCount; i++) {
        buckets.add(new ArrayList<>());
    }
    
    // Distribute
    for (int num : nums) {
        int idx = (num - min) / bucketRange;
        buckets.get(idx).add(num);
    }
    
    // Sort each bucket and collect
    int index = 0;
    for (List<Integer> bucket : buckets) {
        Collections.sort(bucket);
        for (int val : bucket) {
            nums[index++] = val;
        }
    }
}
```

## Dry Run

Array: `[0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]`, n=7

**Step 1: Distribute into 7 buckets**
| Bucket | Index Formula | Elements |
|--------|---------------|----------|
| 0 | - | [] |
| 1 | 0.23×7=1, 0.25×7=1 | [0.23, 0.25] |
| 2 | 0.32×7=2 | [0.32] |
| 3 | 0.42×7=2, 0.47×7=3 | [0.42, 0.47] |
| 4 | 0.52×7=3, 0.51×7=3 | [0.52, 0.51] |
| 5 | - | [] |
| 6 | - | [] |

**Step 2: Sort each bucket**
Bucket 4: [0.52, 0.51] → [0.51, 0.52]

**Step 3: Concatenate**
Result: `[0.23, 0.25, 0.32, 0.42, 0.47, 0.51, 0.52]` ✅

## Full Program

```java
package Sorting;

import java.util.*;

class BucketSort {
    public static void main(String[] args) {
        float[] nums = {0.42f, 0.32f, 0.23f, 0.52f, 0.25f, 0.47f, 0.51f};
        
        System.out.println("Before: " + Arrays.toString(nums));
        bucketSort(nums);
        System.out.println("After:  " + Arrays.toString(nums));
    }
    
    public static void bucketSort(float[] nums) {
        int n = nums.length;
        if (n <= 0) return;
        
        List<List<Float>> buckets = new ArrayList<>();
        for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());
        
        for (float num : nums) {
            int idx = (int) (num * n);
            buckets.get(idx).add(num);
        }
        
        for (List<Float> bucket : buckets) {
            Collections.sort(bucket);
        }
        
        int idx = 0;
        for (List<Float> bucket : buckets) {
            for (float val : bucket) {
                nums[idx++] = val;
            }
        }
    }
}
```

## Complexity

| | Value |
|--|-------|
| **Time (Best)** | O(n + k) -uniform distribution, ~1 element per bucket |
| **Time (Average)** | O(n + k) -with uniform distribution |
| **Time (Worst)** | O(n²) -all elements in one bucket → degrades to insertion sort |
| **Space** | O(n + k) where k = number of buckets |
| **Stable** | ✅ Yes (if sub-sort is stable) |

## When to Use

| ✅ Perfect For | ❌ Bad For |
|---------------|-----------|
| Uniformly distributed data | Clustered/skewed data |
| Floating point values in [0, 1) | Unknown distribution |
| When you know the data range | Worst case matters |
| Sorting by computed keys | Integer-only constraints |

## Bucket Sort vs Counting Sort vs Radix Sort

| Feature | Bucket Sort | Counting Sort | Radix Sort |
|---------|-------------|---------------|------------|
| Input type | Any (mapped to range) | Integers only | Integers/strings |
| Distribution | Uniform required | Any | Any |
| Sub-sort | Comparison-based | None needed | Counting sort |
| Best for | Floats in [0,1) | Small integer range | Fixed-digit integers |

## 🖼️ Infographic Context

**For Napkin AI:** Show elements being distributed into labeled buckets (like sorting mail into bins by zip code). Each bucket is then sorted individually (small bucket = fast sort). Finally, buckets are concatenated left-to-right for the final sorted array. Show the connection to hash tables -bucket index = hash of the value.

Image path: `public/infographic/sorting/bucket-sort.png`

## Key Interview Points

- **Scatter-gather** approach: scatter into buckets, sort each, gather
- O(n) average for **uniformly distributed** data
- Degrades to O(n²) if all elements land in same bucket
- Best for floating-point values in known range
- Number of buckets ≈ n (or √n for integer version)
- Combines with insertion sort for small buckets
- Asked as: "Sort floating point numbers in [0,1)" → Bucket Sort
