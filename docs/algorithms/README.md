# Algorithms - Searching & Sorting

A comprehensive line-by-line explanation of all major searching and sorting algorithms in Java.

## 📁 Structure

```
docs/algorithms/
├── searching/
│   ├── 01-linear-search.md
│   ├── 02-binary-search.md
│   ├── 03-jump-search.md
│   ├── 04-interpolation-search.md
│   ├── 05-exponential-search.md
│   ├── 06-fibonacci-search.md
│   ├── 07-ternary-search.md
│   ├── 08-dfs.md
│   ├── 09-bfs.md
│   └── 10-two-pointer-search.md
├── sorting/
│   ├── 01-bubble-sort.md
│   ├── 02-selection-sort.md
│   ├── 03-insertion-sort.md
│   ├── 04-merge-sort.md
│   ├── 05-quick-sort.md
│   ├── 06-heap-sort.md
│   ├── 07-counting-sort.md
│   ├── 08-radix-sort.md
│   ├── 09-bucket-sort.md
│   ├── 10-shell-sort.md
│   ├── 11-cycle-sort.md
│   └── 12-tim-sort.md
└── README.md
```

## 🖼️ Infographics

All infographic images are stored in `public/infographic/` folder.
Use Napkin AI to generate infographics from the context provided in each file.

## 📊 Complexity Quick Reference

### Searching

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Linear Search | O(1) | O(n) | O(n) | O(1) |
| Binary Search | O(1) | O(log n) | O(log n) | O(1) |
| Jump Search | O(1) | O(√n) | O(√n) | O(1) |
| Interpolation Search | O(1) | O(log log n) | O(n) | O(1) |
| Exponential Search | O(1) | O(log n) | O(log n) | O(1) |
| Fibonacci Search | O(1) | O(log n) | O(log n) | O(1) |
| Ternary Search | O(1) | O(log₃ n) | O(log₃ n) | O(1) |

### Sorting

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | ✅ |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n+k) | ✅ |
| Bucket Sort | O(n+k) | O(n+k) | O(n²) | O(n) | ✅ |
| Shell Sort | O(n log n) | O(n^1.25) | O(n²) | O(1) | ❌ |
| Tim Sort | O(n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Cycle Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
