"use client";

import { useEffect, useMemo } from "react";
import { useQuestionStore } from "@/store/questionStore";
import QuestionTable from "@/components/table/QuestionTable";
import FilterSection from "@/components/table/FilterSection";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

interface TopicClientProps {
    topic: string;
}

export default function TopicClient({ topic }: TopicClientProps) {
    const allQuestions = useQuestionStore((s) => s.allQuestions);
    const loadTopic = useQuestionStore((s) => s.loadTopic);
    const filters = useQuestionStore((s) => s.filters);
    const progress = useQuestionStore((s) => s.progress);

    useEffect(() => {
        loadTopic(topic);
    }, [topic, loadTopic]);

    const filteredQuestions = useMemo(() => {
        return allQuestions.filter(q => {
            const matchesSearch = q.title.toLowerCase().includes(filters.searchQuery.toLowerCase());
            const matchesPattern = filters.patterns.length === 0 || q.pattern.some(p => filters.patterns.includes(p));
            const matchesDifficulty = filters.difficulties.length === 0 || filters.difficulties.includes(q.difficulty);

            const matchesBlind75 = filters.blind75 === null || q.blind75 === filters.blind75;
            const matchesNeetcode = filters.neetcode === null || q.neetcode === filters.neetcode;

            const matchesCompany = filters.companies.length === 0 || (q.companyTags && q.companyTags.some(c => filters.companies.includes(c)));

            return matchesSearch && matchesPattern && matchesDifficulty && matchesBlind75 && matchesNeetcode && matchesCompany;
        });
    }, [allQuestions, filters]);

    const solvedCount = useMemo(() => {
        return allQuestions.filter(q => progress[q.title]?.solved).length;
    }, [allQuestions, progress]);

    return (
        <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 min-h-screen bg-slate-50/20 dark:bg-slate-950/20 transition-colors duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 text-sm font-medium transition-colors group w-fit">
                            <MoveLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Topics
                        </Link>
                        <div className="md:hidden">
                            <ThemeToggle />
                        </div>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white capitalize tracking-tight">
                        {topic} <span className="text-blue-600">Mastery</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in zoom-in duration-700 min-w-[200px]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Progress</span>
                            <span className="text-xs font-black text-blue-600 dark:text-blue-400">{Math.round((solvedCount / (allQuestions.length || 1)) * 100)}%</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900 dark:text-white">{solvedCount}</span>
                            <span className="text-slate-400 font-bold">/ {allQuestions.length}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 mt-3 rounded-full overflow-hidden border border-slate-50 dark:border-slate-800">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                                style={{ width: `${(solvedCount / (allQuestions.length || 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <FilterSection />

            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        Questions
                        <span className="text-xs bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-bold">
                            {filteredQuestions.length}
                        </span>
                    </h2>
                </div>
                <QuestionTable questions={filteredQuestions} />
            </div>
        </main>
    );
}
