import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "@/types/question";

import arrays from "@/data/arrays.json";
import strings from "@/data/strings.json";
import dp from "@/data/dp.json";

const topicMap: Record<string, Question[]> = {
    arrays: arrays as Question[],
    strings: strings as Question[],
    dp: dp as Question[]
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
                set({
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
                    },
                }),
        }),
        {
            name: "leetcode-tracker-progress",
            partialize: (state) => ({ progress: state.progress }),
        }
    )
);

