"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Question } from "@/types/question";

export default function SolutionDrawer({
    question
}: {
    question: Question;
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="sm" variant="outline">
                    Click
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[40%] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {question.title}
                </h2>

                <div className="space-y-3 text-sm">
                    <p>
                        <strong>Difficulty:</strong>{" "}
                        {question.difficulty}
                    </p>

                    <p>
                        <strong>Patterns:</strong>{" "}
                        {question.pattern.join(", ")}
                    </p>

                    {question.interviewMemoryTrick && (
                        <p>
                            <strong>Memory Trick:</strong>{" "}
                            {question.interviewMemoryTrick}
                        </p>
                    )}

                    {question.companyTags.length > 0 && (
                        <p>
                            <strong>Companies:</strong>{" "}
                            {question.companyTags.join(", ")}
                        </p>
                    )}

                    <div>
                        <strong>Solution:</strong>
                        <pre className="mt-2 bg-slate-100 p-3 rounded whitespace-pre-wrap">
                            {question.textSolution || "No solution added yet."}
                        </pre>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
