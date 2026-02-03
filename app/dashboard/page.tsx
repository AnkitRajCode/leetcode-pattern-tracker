"use client";

import { useAuth } from "@/context/AuthContext";
import { useQuestionStore } from "@/store/questionStore";
import { useEffect, useMemo } from "react";
import LeetcodeSync from "@/components/LeetcodeSync";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BarChart3, CheckCircle2, Layout, Trophy, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// Import all question data for stats calculation
import arrays from "@/data/arrays.json";
import strings from "@/data/strings.json";
import dp from "@/data/dp.json";
import linkedlist from "@/data/linkedlist.json";
import graph from "@/data/graph.json";
import tree from "@/data/tree.json";

const allQuestionsData = [
    ...arrays,
    ...strings,
    ...dp,
    ...linkedlist,
    ...graph,
    ...tree
];

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const { progress } = useQuestionStore();

    useEffect(() => {
        if (!loading && !user) {
            redirect("/");
        }
    }, [user, loading]);

    const stats = useMemo(() => {
        const counts = {
            total: allQuestionsData.length,
            solved: 0,
            easy: { total: 0, solved: 0 },
            medium: { total: 0, solved: 0 },
            hard: { total: 0, solved: 0 }
        };

        allQuestionsData.forEach(q => {
            const difficulty = q.difficulty.toLowerCase() as "easy" | "medium" | "hard";
            counts[difficulty].total++;

            if (progress[q.title]?.solved) {
                counts.solved++;
                counts[difficulty].solved++;
            }
        });

        return counts;
    }, [progress]);

    if (loading) return null;
    if (!user) return null;

    const calculatePercentage = (solved: number, total: number) => {
        return total > 0 ? Math.round((solved / total) * 100) : 0;
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 transition-colors duration-500">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <User size={40} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                                Welcome back, {user.displayName?.split(' ')[0]}!
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                Track your progress and sync with LeetCode.
                            </p>
                        </div>
                    </div>
                    <Link href="/">
                        <Button variant="outline" className="rounded-xl font-bold flex items-center gap-2">
                            <Layout size={18} />
                            Browse Topics
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="rounded-3xl border-none bg-blue-600 text-white shadow-xl shadow-blue-500/20">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest opacity-80">Total Progress</CardTitle>
                            <Trophy size={20} className="opacity-80" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-black mb-2">{calculatePercentage(stats.solved, stats.total)}%</div>
                            <Progress value={calculatePercentage(stats.solved, stats.total)} className="h-2 bg-white/20" />
                            <p className="mt-4 text-xs font-bold opacity-80">{stats.solved} / {stats.total} Questions Solved</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Easy</CardTitle>
                            <CheckCircle2 size={20} className="text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-slate-900 dark:text-white mb-2">{calculatePercentage(stats.easy.solved, stats.easy.total)}%</div>
                            <Progress value={calculatePercentage(stats.easy.solved, stats.easy.total)} className="h-2 bg-slate-100 dark:bg-slate-800" />
                            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">{stats.easy.solved} / {stats.easy.total} Solved</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Medium</CardTitle>
                            <BarChart3 size={20} className="text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-slate-900 dark:text-white mb-2">{calculatePercentage(stats.medium.solved, stats.medium.total)}%</div>
                            <Progress value={calculatePercentage(stats.medium.solved, stats.medium.total)} className="h-2 bg-slate-100 dark:bg-slate-800" />
                            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">{stats.medium.solved} / {stats.medium.total} Solved</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-3xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Hard</CardTitle>
                            <Trophy size={20} className="text-rose-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black text-slate-900 dark:text-white mb-2">{calculatePercentage(stats.hard.solved, stats.hard.total)}%</div>
                            <Progress value={calculatePercentage(stats.hard.solved, stats.hard.total)} className="h-2 bg-slate-100 dark:bg-slate-800" />
                            <p className="mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">{stats.hard.solved} / {stats.hard.total} Solved</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Sync Section */}
                    <div className="space-y-6">
                        <div className="p-1 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 w-fit px-4 py-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
                            Settings
                        </div>
                        <LeetcodeSync />
                    </div>

                    {/* Quick Guidance */}
                    <div className="space-y-6">
                        <div className="p-1 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800 w-fit px-4 py-1.5 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest">
                            Tips
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                            <h4 className="font-bold text-slate-900 dark:text-white">Why sync with LeetCode?</h4>
                            <ul className="space-y-3">
                                <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 text-xs font-bold">1</span>
                                    Automatically track your progress without manual effort.
                                </li>
                                <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 text-xs font-bold">2</span>
                                    Gain insights into your weak areas by difficulty levels.
                                </li>
                                <li className="flex gap-2 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 text-xs font-bold">3</span>
                                    Keep your data persisted across sessions and devices.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

