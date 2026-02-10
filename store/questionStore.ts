import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "@/types/question";

import arrays from "@/data/arrays.json";
import strings from "@/data/strings.json";
import dp from "@/data/dp.json";
import linkedlist from "@/data/linkedlist.json";
import graph from "@/data/graph.json";
import tree from "@/data/tree.json";

const topicMap: Record<string, Question[]> = {
    arrays: arrays as Question[],
    strings: strings as Question[],
    dp: dp as Question[],
    linkedlist: linkedlist as Question[],
    graph: graph as Question[],
    tree: tree as Question[]
};

export type FilterState = {
    patterns: string[];
    difficulties: string[];
    blind75: boolean | null;
    neetcode: boolean | null;
    top100: boolean | null;
    lovebabbar: boolean | null;
    striver: boolean | null;
    grind75: boolean | null;
    apnaCollege: boolean | null;
    algoPrep: boolean | null;
    arshDSASheet: boolean | null;
    algoMaster: boolean | null;
    instabyte: boolean | null;
    leetcode: boolean | null;
    geeksforgeeks: boolean | null;
    interviewbit: boolean | null;
    companies: string[];
    searchQuery: string;
    leetcodeUsername: string;
};

type Store = {
    allQuestions: Question[];
    progress: Record<string, { solved: boolean; revision: boolean }>;
    filters: FilterState;
    loadTopic: (topic: string) => void;
    toggleSolved: (title: string) => void;
    toggleRevision: (title: string) => void;
    setFilters: (filters: Partial<FilterState>) => void;
    setProgress: (progress: Record<string, { solved: boolean; revision: boolean }>) => void;
    clearFilters: () => void;
    syncWithLeetcode: (uid: string) => Promise<void>;
    setLeetcodeUsername: (username: string) => void;
};

export const useQuestionStore = create<Store>()(
    persist(
        (set) => ({
            allQuestions: [],
            progress: {},
            filters: {
                patterns: [],
                difficulties: [],
                blind75: null,
                neetcode: null,
                top100: null,
                lovebabbar: null,
                striver: null,
                grind75: null,
                apnaCollege: null,
                algoPrep: null,
                arshDSASheet: null,
                algoMaster: null,
                instabyte: null,
                leetcode: null,
                geeksforgeeks: null,
                interviewbit: null,
                companies: [],
                searchQuery: "",
                leetcodeUsername: "",
            },

            loadTopic: (topic) =>
                set({
                    allQuestions: topicMap[topic] || []
                }),

            toggleSolved: (title) =>
                set((state) => ({
                    progress: {
                        ...state.progress,
                        [title]: {
                            ...state.progress[title],
                            solved: !state.progress[title]?.solved,
                        },
                    },
                })),

            toggleRevision: (title) =>
                set((state) => ({
                    progress: {
                        ...state.progress,
                        [title]: {
                            ...state.progress[title],
                            revision: !state.progress[title]?.revision,
                        },
                    },
                })),

            setFilters: (newFilters) =>
                set((state) => ({
                    filters: { ...state.filters, ...newFilters },
                })),

            setProgress: (progress) =>
                set({ progress }),

            clearFilters: () =>
                set((state) => ({
                    filters: {
                        patterns: [],
                        difficulties: [],
                        blind75: null,
                        neetcode: null,
                        top100: null,
                        lovebabbar: null,
                        striver: null,
                        grind75: null,
                        apnaCollege: null,
                        algoPrep: null,
                        arshDSASheet: null,
                        algoMaster: null,
                        instabyte: null,
                        leetcode: null,
                        geeksforgeeks: null,
                        interviewbit: null,
                        companies: [],
                        searchQuery: "",
                        leetcodeUsername: state.filters.leetcodeUsername,
                    },
                })),

            setLeetcodeUsername: (username) =>
                set((state) => ({
                    filters: { ...state.filters, leetcodeUsername: username },
                })),

            syncWithLeetcode: async (uid) => {
                const { filters, progress } = useQuestionStore.getState();
                const username = filters.leetcodeUsername;

                if (!username) return;

                try {
                    // Build a slug → local title lookup from all topic questions
                    const slugToTitle: Record<string, string> = {};
                    Object.values(topicMap).forEach(questions => {
                        questions.forEach(q => {
                            const match = q.url.match(/leetcode\.com\/problems\/([^/]+)/);
                            if (match) {
                                slugToTitle[match[1]] = q.title;
                            }
                        });
                    });

                    const response = await fetch("/api/leetcode/sync", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username }),
                    });

                    if (!response.ok) throw new Error("Sync failed");

                    const data = await response.json();
                    const recentSubmissions = data.data.recentAcSubmissionList || [];

                    // Match by URL slug instead of title for reliable matching
                    const solvedTitles = recentSubmissions
                        .map((s: any) => slugToTitle[s.titleSlug] || null)
                        .filter(Boolean) as string[];

                    // Update progress state
                    const newProgress = { ...progress };
                    solvedTitles.forEach((title: string) => {
                        newProgress[title] = {
                            ...newProgress[title],
                            solved: true,
                        };
                    });

                    set({ progress: newProgress });
                } catch (error) {
                    console.error("Sync error:", error);
                    throw error;
                }
            },
        }),
        {
            name: "leetcode-tracker-progress",
            partialize: (state) => ({ progress: state.progress }),
        }
    )
);

