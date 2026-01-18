export type Question = {
    title: string;
    url: string;
    difficulty: "easy" | "medium" | "hard";
    tag: string;
    pattern: string[];
    revision: boolean;
    solved: boolean;
    top100: boolean;
    blind75?: boolean;
    lovebabbar: boolean;
    striver: boolean;
    neetcode: boolean;
    interviewMemoryTrick: string;
    companyTags: string[];
    notes: string;
    videoSolution: string;
    textSolution: string;
};
