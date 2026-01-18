"use client";

import { useState } from "react";
import { Question } from "@/types/question";
import { useQuestionStore } from "@/store/questionStore";
import SolutionDrawer from "./SolutionDrawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuestionRow({
    question
}: {
    question: Question;
}) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleSolved = useQuestionStore((s) => s.toggleSolved);
    const toggleRevision = useQuestionStore((s) => s.toggleRevision);
    const isSolved = useQuestionStore((s) => s.progress[question.title]?.solved ?? false);
    const isRevision = useQuestionStore((s) => s.progress[question.title]?.revision ?? false);

    const difficultyColor = {
        easy: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
        medium: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
        hard: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
    };

    return (
        <tr className="group border-b dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
            <td className="p-4 text-center">
                <Checkbox
                    checked={isSolved}
                    onCheckedChange={() => toggleSolved(question.title)}
                    className="border-slate-300 dark:border-slate-700 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
            </td>

            <td className="p-4 text-center">
                <Checkbox
                    checked={isRevision}
                    onCheckedChange={() => toggleRevision(question.title)}
                    className="border-slate-300 dark:border-slate-700 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
            </td>

            <td className="p-4 font-medium">
                <div className="flex items-center gap-2">
                    <a
                        href={question.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-1 group/link"
                    >
                        {question.title}
                        <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity text-slate-400 dark:text-slate-500" />
                    </a>
                    {question.blind75 && (
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20 py-0 h-5">
                            Blind75
                        </Badge>
                    )}
                </div>
            </td>

            <td className="p-4 text-center">
                <Badge variant="outline" className={`${difficultyColor[question.difficulty as keyof typeof difficultyColor]} capitalize`}>
                    {question.difficulty}
                </Badge>
            </td>

            <td className="p-4">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {question.pattern.map((p) => (
                        <Badge key={p} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-normal hover:bg-slate-200 dark:hover:bg-slate-700 whitespace-nowrap">
                            {p}
                        </Badge>
                    ))}
                </div>
            </td>

            <td className="p-4 text-center">
                {question.videoSolution ? (
                    <a
                        href={question.videoSolution}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
                        title="Watch Solution Video"
                    >
                        <Youtube size={16} />
                    </a>
                ) : (
                    <span className="text-slate-300 dark:text-slate-700 text-xs">N/A</span>
                )}
            </td>

            <td className="p-4 text-right">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDrawerOpen(true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 hover:text-blue-700 dark:hover:text-blue-300 font-semibold h-8"
                >
                    Solution
                </Button>
                <SolutionDrawer
                    question={question}
                    open={drawerOpen}
                    onOpenChange={setDrawerOpen}
                />
            </td>
        </tr>
    );
}

