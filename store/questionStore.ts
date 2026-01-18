import { create } from "zustand";
import { Question } from "@/types/question";

import arrays from "@/data/arrays.json";
import strings from "@/data/strings.json";
import dp from "@/data/dp.json";

const topicMap: Record<string, Question[]> = {
    arrays: arrays as Question[],
    strings: strings as Question[],
    dp: dp as Question[]
};

type Store = {
    questions: Question[];
    loadTopic: (topic: string) => void;
    toggleSolved: (title: string) => void;
    toggleRevision: (title: string) => void;
};

export const useQuestionStore = create<Store>((set) => ({
    questions: [],
    loadTopic: (topic) =>
        set({
            questions: topicMap[topic] || []
        }),

    toggleSolved: (title) =>
        set((state) => ({
            questions: state.questions.map((q) =>
                q.title === title
                    ? { ...q, solved: !q.solved }
                    : q
            )
        })),

    toggleRevision: (title) =>
        set((state) => ({
            questions: state.questions.map((q) =>
                q.title === title
                    ? { ...q, revision: !q.revision }
                    : q
            )
        }))
}));
