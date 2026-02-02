import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Code2, Cpu, GraduationCap, Link2 } from "lucide-react";
import UserNav from "@/components/UserNav";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "LeetCode Pattern Tracker - Home",
  description: "Stop memorizing solutions. Start mastering patterns. The ultimate tracker for Blind 75, NeetCode, and pattern-based DSA interview preparation.",
};

const topics = [
  { id: "arrays", name: "Arrays & Hashing", icon: <Code2 className="text-blue-500" />, description: "Master the foundation of DSA with pattern-based array problems." },
  { id: "strings", name: "String Manipulation", icon: <BookOpen className="text-emerald-500" />, description: "Efficient techniques for traversals, palindromes, and substrings." },
  { id: "linkedlist", name: "Linked Lists", icon: <Link2 className="text-amber-500" />, description: "Master pointer manipulation, reversals, and cycle detection." },
  { id: "dp", name: "Dynamic Programming", icon: <Cpu className="text-rose-500" />, description: "Transition from recursion to optimized memoization and tabulations." }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 p-6 md:p-12 lg:p-24 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-12 text-slate-900 dark:text-white">
        <div className="flex justify-end items-center gap-4">
          <UserNav />
          <ThemeToggle />
        </div>
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <GraduationCap size={14} />
            Interview Ready
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            LeetCode <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Patterns</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Stop memorizing solutions. Start mastering patterns. Your journey to top-tier engineering roles begins here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((t) => (
            <Link
              key={t.id}
              href={`/topics/${t.id}`}
              className="group relative p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-blue-500 dark:hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                {t.icon}
              </div>

              <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 w-fit group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors duration-500">
                {t.icon}
              </div>

              <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {t.name}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {t.description}
              </p>

              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                Start Tracking →
              </div>
            </Link>
          ))}
        </div>

        <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-2xl font-black">75+</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Blind75 Ready</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black">150+</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">NeetCode Pro</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black">20+</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Top Patterns</p>
            </div>
          </div>
          <div className="text-slate-400 dark:text-slate-500 text-sm font-medium">
            © 2026 PatternTracker. All rights reserved.
          </div>
        </div>
      </div>
    </main>
  );
}
