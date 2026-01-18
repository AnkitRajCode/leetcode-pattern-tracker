"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuestionStore } from "@/store/questionStore";
import QuestionTable from "@/components/table/QuestionTable";

export default function TopicPage() {
  const params = useParams();
  const topic = params.topic as string;

  const loadTopic = useQuestionStore((s) => s.loadTopic);
  const questions = useQuestionStore((s) => s.questions);

  useEffect(() => {
    loadTopic(topic);
  }, [topic, loadTopic]);

  return (
    <main className="p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold capitalize">
          {topic} Questions
        </h1>
        <div className="text-sm text-slate-600">
          {questions.filter((q) => q.solved).length} /{" "}
          {questions.length} Solved
        </div>
      </div>

      <QuestionTable questions={questions} />
    </main>
  );
}
