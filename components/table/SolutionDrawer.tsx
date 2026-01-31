"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Question } from "@/types/question";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Brain, Building2, Layers, Youtube } from "lucide-react";

interface SolutionDrawerProps {
    question: Question;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SolutionDrawer({
    question,
    open,
    onOpenChange,
}: SolutionDrawerProps) {
    const difficultyColor = {
        easy: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        medium: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
        hard: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-[50%] lg:max-w-[40%] overflow-y-auto p-0 border-l dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-500"
            >
                <div className="h-full flex flex-col">
                    <SheetHeader className="p-6 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                        <SheetTitle className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            {question.title}
                        </SheetTitle>
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className={`${difficultyColor[question.difficulty as keyof typeof difficultyColor]} capitalize px-2 py-0.5`}>
                                {question.difficulty}
                            </Badge> |
                            <div className="flex gap-1">
                                {question.pattern.map((p) => (
                                    <Badge key={p} variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                                        {p}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="flex-1 p-6 space-y-8">
                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {question.interviewMemoryTrick && (
                                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 transition-colors">
                                    <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold mb-2 text-sm">
                                        <Brain size={16} />
                                        Memory Trick
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                                        {question.interviewMemoryTrick}
                                    </p>
                                </div>
                            )}

                            {question.videoSolution && (
                                <a
                                    href={question.videoSolution}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/10 group transition-all hover:bg-white dark:hover:bg-slate-900 hover:border-rose-200 dark:hover:border-rose-900"
                                >
                                    <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold mb-2 text-sm group-hover:text-rose-600 transition-colors">
                                        <Youtube size={16} />
                                        Video Guide
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">Watch deep-dive explanation by industry mentors.</p>
                                </a>
                            )}
                        </div>

                        {/* Companies */}
                        {question.companyTags && question.companyTags.length > 0 && (
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-colors">
                                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold mb-2 text-sm">
                                    <Building2 size={16} />
                                    Companies Focused
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {question.companyTags.map(tag => (
                                        <span key={tag} className="text-xs bg-white dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold border-b dark:border-slate-800 pb-2 transition-colors">
                                <Layers size={18} />
                                Solution Explanation
                            </div>
                            <div className="bg-white dark:bg-slate-950 rounded-lg transition-colors overflow-hidden">
                                {question.textSolution ? (
                                    <MarkdownRenderer content={question.textSolution} />
                                ) : (
                                    <div className="text-slate-400 dark:text-slate-600 italic text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
                                        No solution added yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
