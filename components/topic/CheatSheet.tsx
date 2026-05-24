"use client";

import { BookOpen, ArrowUpDown, Search, MousePointer2, Layers, Cpu, Hash, GitBranch } from "lucide-react";

interface CheatSheetCard {
    title: string;
    icon: React.ReactNode;
    color: string;
    items: { label: string; desc: string }[];
}

const cheatSheetData: Record<string, CheatSheetCard[]> = {
    arrays: [
        {
            title: "Sorting",
            icon: <ArrowUpDown size={18} />,
            color: "blue",
            items: [
                { label: "Quick Sort", desc: "O(n log n) avg" },
                { label: "Merge Sort", desc: "Stable, O(n log n)" }
            ]
        },
        {
            title: "Searching",
            icon: <Search size={18} />,
            color: "emerald",
            items: [
                { label: "Binary Search", desc: "Sorted arrays, O(log n)" }
            ]
        },
        {
            title: "Two Pointers",
            icon: <MousePointer2 size={18} />,
            color: "indigo",
            items: [
                { label: "In-place", desc: "Sorted manipulation" }
            ]
        },
        {
            title: "Sliding Window",
            icon: <Layers size={18} />,
            color: "rose",
            items: [
                { label: "Subarrays", desc: "Min/Max in window" }
            ]
        }
    ],
    strings: [
        {
            title: "Pattern Matching",
            icon: <Search size={18} />,
            color: "blue",
            items: [
                { label: "KMP Algorithm", desc: "LPS array, O(n+m) substring search" },
                { label: "Rabin-Karp", desc: "Rolling hash, O(n+m) avg, good for multiple patterns" },
                { label: "Z-Algorithm", desc: "Z-array for pattern occurrences in O(n+m)" }
            ]
        },
        {
            title: "Two Pointers / Sliding Window",
            icon: <MousePointer2 size={18} />,
            color: "emerald",
            items: [
                { label: "Palindrome Check", desc: "left/right pointers moving inward" },
                { label: "Longest Substring (No Repeat)", desc: "Sliding window + HashSet" },
                { label: "Minimum Window Substring", desc: "Expand right, shrink left, freq map" },
                { label: "Anagram Detection", desc: "Fixed-size window + char frequency" }
            ]
        },
        {
            title: "HashMap / Frequency",
            icon: <Hash size={18} />,
            color: "indigo",
            items: [
                { label: "Valid Anagram", desc: "int[26] freq count comparison" },
                { label: "Group Anagrams", desc: "Sorted string as key → HashMap grouping" },
                { label: "First Unique Char", desc: "Frequency array + single pass" },
                { label: "Ransom Note", desc: "Freq count of available chars" }
            ]
        },
        {
            title: "DP & Stack",
            icon: <Cpu size={18} />,
            color: "rose",
            items: [
                { label: "Longest Palindromic Substring", desc: "Expand around center or dp[i][j]" },
                { label: "Edit Distance", desc: "Insert/delete/replace, dp[i][j]" },
                { label: "Valid Parentheses", desc: "Stack: push open, pop on close" },
                { label: "Decode String", desc: "Stack of [string, count] pairs" }
            ]
        }
    ],
    dp: [
        {
            title: "Common Types",
            icon: <Cpu size={18} />,
            color: "indigo",
            items: [
                { label: "Knapsack", desc: "0/1 or Unbounded" },
                { label: "LCS", desc: "Subsequences/Substrings" }
            ]
        },
        {
            title: "Optimization",
            icon: <GitBranch size={18} />,
            color: "rose",
            items: [
                { label: "Memoization", desc: "Top-down approach" },
                { label: "Tabulation", desc: "Bottom-up approach" }
            ]
        }
    ],
    linkedlist: [
        {
            title: "Fundamentals",
            icon: <GitBranch size={18} />,
            color: "blue",
            items: [
                { label: "Traversal", desc: "Iterate through the list, understand the node structure" },
                { label: "Insertion/Deletion", desc: "At beginning, end, or at a specific position" }
            ]
        },
        {
            title: "Techniques",
            icon: <MousePointer2 size={18} />,
            color: "emerald",
            items: [
                { label: "Reversal", desc: "In-place reversal, recursive and iterative approaches" },
                { label: "Cycle Detection", desc: "Floyd's Tortoise and Hare algorithm" }
            ]
        },
        {
            title: "Key Patterns",
            icon: <Search size={18} />,
            color: "gray",
            items: [
                { label: "Fast & Slow Pointers", desc: "Finding middle, cycle detection, or kth from end" },
                { label: "Intersection Point", desc: "Length difference or hashing approach" }
            ]
        },
        {
            title: "Complex Structures",
            icon: <Layers size={18} />,
            color: "rose",
            items: [
                { label: "Doubly Linked List", desc: "Nodes with both next and previous pointers" },
                { label: "Flattening Lists", desc: "Merging multi-level lists into a single list" }
            ]
        }
    ],
    generic: [
        {
            title: "Two Pointers",
            icon: <MousePointer2 size={18} />,
            color: "blue",
            items: [
                { label: "Opposite Ends", desc: "Converge from both sides of sorted input" },
                { label: "Same Direction", desc: "Fast & slow pointers for partitioning" }
            ]
        },
        {
            title: "Dynamic Programming",
            icon: <Cpu size={18} />,
            color: "emerald",
            items: [
                { label: "Fibonacci Pattern", desc: "Build from base cases with rolling variables" },
                { label: "State Transition", desc: "Define recurrence, memo or tabulate" }
            ]
        },
        {
            title: "Greedy Strategies",
            icon: <ArrowUpDown size={18} />,
            color: "indigo",
            items: [
                { label: "Interval Scheduling", desc: "Sort by end time, pick non-overlapping" },
                { label: "Optimal Substructure", desc: "Local best choice leads to global optimum" }
            ]
        },
        {
            title: "Bit Manipulation",
            icon: <Hash size={18} />,
            color: "rose",
            items: [
                { label: "XOR Tricks", desc: "Find unique elements, toggle bits" },
                { label: "Bitmask DP", desc: "Subset enumeration with bitmasks" }
            ]
        }
    ]
};

export default function CheatSheet({ topic }: { topic: string }) {
    const data = cheatSheetData[topic.toLowerCase()];

    if (!data) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Topic <span className="text-blue-600">Cheat Sheet</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.map((card, idx) => (
                    <div
                        key={idx}
                        className="group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className={`w-10 h-10 rounded-xl bg-${card.color}-50 dark:bg-${card.color}-900/20 flex items-center justify-center text-${card.color}-600 dark:text-${card.color}-400 mb-4 group-hover:scale-110 transition-transform`}>
                            {card.icon}
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                            {card.title}
                        </h3>
                        <ul className="space-y-2">
                            {card.items.map((item, i) => (
                                <li key={i} className="text-sm">
                                    <span className="font-bold text-slate-700 dark:text-slate-300 block">{item.label}</span>
                                    <span className="text-slate-500 dark:text-slate-500 text-xs">{item.desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
