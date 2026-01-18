"use client";

import { Question } from "@/types/question";
import QuestionRow from "./QuestionRow";

export default function QuestionTable({
    questions
}: {
    questions: Question[];
}) {
    return (
        <div className="border rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm border-slate-200 dark:border-slate-800 transition-colors duration-500">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
                        <th className="p-4 text-center font-semibold text-slate-900 dark:text-slate-100 w-16">Solved</th>
                        <th className="p-4 text-center font-semibold text-slate-900 dark:text-slate-100 w-16">Revise</th>
                        <th className="p-4 text-left font-semibold text-slate-900 dark:text-slate-100">Question</th>
                        <th className="p-4 text-center font-semibold text-slate-900 dark:text-slate-100 w-28">Difficulty</th>
                        <th className="p-4 text-left font-semibold text-slate-900 dark:text-slate-100">Patterns</th>
                        <th className="p-4 text-center font-semibold text-slate-900 dark:text-slate-100 w-20">Video</th>
                        <th className="p-4 text-right font-semibold text-slate-900 dark:text-slate-100 w-24"></th>
                    </tr>
                </thead>
                <tbody>
                    {questions.length > 0 ? (
                        questions.map((q) => (
                            <QuestionRow key={q.title} question={q} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="p-12 text-center text-slate-400 dark:text-slate-600 italic">
                                No questions found matching your filters.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
