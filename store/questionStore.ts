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

            clearFilters: () =>
                set({
                    filters: {
                        patterns: [],
                        difficulties: [],
                        blind75: null,
                        neetcode: null,
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

