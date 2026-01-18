"use client";

import { Question } from "@/types/question";
import { useQuestionStore } from "@/store/questionStore";
import SolutionDrawer from "./SolutionDrawer";

export default function QuestionRow({
    question
}: {
    question: Question;
}) {
    const toggleSolved = useQuestionStore((s) => s.toggleSolved);
    const toggleRevision = useQuestionStore((s) => s.toggleRevision);

    return (
        <tr className="border-b hover:bg-slate-50">
            <td className="text-center">
                <input
                    type="checkbox"
                    checked={question.solved}
                    onChange={() => toggleSolved(question.title)}
                />
            </td>

            <td className="text-center">
                <input
                    type="checkbox"
                    checked={question.revision}
                    onChange={() => toggleRevision(question.title)}
                />
            </td>

            <td className="p-2 font-medium">
                <a
                    href={question.url}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                >
                    {question.title}
                </a>
            </td>

            <td className="text-center capitalize">
                <span className={`badge ${question.difficulty}`}>
                    {question.difficulty}
                </span>
            </td>

            <td className="p-2">
                {question.pattern.map((p) => (
                    <span key={p} className="tag">
                        {p}
                    </span>
                ))}
            </td>

            <td className="text-center">
                <SolutionDrawer question={question} />
            </td>
        </tr>
    );
}
