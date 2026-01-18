"use client";

import { Question } from "@/types/question";
import QuestionRow from "./QuestionRow";

export default function QuestionTable({
    questions
}: {
    questions: Question[];
}) {
    return (
        <table className="w-full border rounded-xl overflow-hidden">
            <thead className="bg-slate-100">
                <tr>
                    <th className="p-2">Solved</th>
                    <th className="p-2">Revise</th>
                    <th className="p-2 text-left">Question</th>
                    <th className="p-2">Difficulty</th>
                    <th className="p-2">Patterns</th>
                    <th className="p-2">Solution</th>
                </tr>
            </thead>
            <tbody>
                {questions.map((q) => (
                    <QuestionRow key={q.title} question={q} />
                ))}
            </tbody>
        </table>
    );
}
