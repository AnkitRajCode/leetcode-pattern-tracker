"use client";

import { useQuestionStore } from "@/store/questionStore";
import { Input } from "@/components/ui/input";
import { Search, X, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FilterSection() {
    const allQuestions = useQuestionStore((s) => s.allQuestions);
    const filters = useQuestionStore((s) => s.filters);
    const setFilters = useQuestionStore((s) => s.setFilters);
    const clearFilters = useQuestionStore((s) => s.clearFilters);

    // Derive unique options
    const allPatterns = Array.from(new Set(allQuestions.flatMap(q => q.pattern))).sort();
    const allCompanies = Array.from(new Set(allQuestions.flatMap(q => q.companyTags || []))).sort();

    const toggleFilter = (key: "patterns" | "difficulties" | "companies", value: string) => {
        const current = filters[key] as string[];
        if (current.includes(value)) {
            setFilters({ [key]: current.filter(v => v !== value) });
        } else {
            setFilters({ [key]: [...current, value] });
        }
    };

    const hasActiveFilters =
        filters.searchQuery ||
        filters.patterns.length > 0 ||
        filters.difficulties.length > 0 ||
        filters.blind75 !== null ||
        filters.neetcode !== null ||
        filters.companies.length > 0;

    return (
        <div className="space-y-6 mb-8 bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500 transition-colors">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold mb-4">
                <Filter size={18} className="text-blue-600" />
                Advanced Filters
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                    placeholder="Search by question title..."
                    className="pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-blue-500 rounded-xl shadow-sm transition-all text-slate-900 dark:text-slate-100"
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ searchQuery: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Patterns */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        Patterns
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 leading-none">{allPatterns.length}</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 p-1">
                        {allPatterns.map(p => (
                            <Badge
                                key={p}
                                variant={filters.patterns.includes(p) ? "default" : "outline"}
                                className={`cursor-pointer transition-all hover:scale-105 px-3 py-1 font-medium ${filters.patterns.includes(p)
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700"
                                    }`}
                                onClick={() => toggleFilter("patterns", p)}
                            >
                                {p}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-wrap gap-8">
                        {/* Difficulty */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Difficulty</h3>
                            <div className="flex gap-2">
                                {["easy", "medium", "hard"].map(d => (
                                    <Button
                                        key={d}
                                        size="sm"
                                        variant={filters.difficulties.includes(d) ? "default" : "outline"}
                                        className={`capitalize rounded-lg px-4 h-9 font-medium transition-all ${filters.difficulties.includes(d)
                                                ? d === 'easy' ? 'bg-emerald-600 hover:bg-emerald-700 border-emerald-600' :
                                                    d === 'medium' ? 'bg-amber-600 hover:bg-amber-700 border-amber-600' :
                                                        'bg-rose-600 hover:bg-rose-700 border-rose-600'
                                                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            }`}
                                        onClick={() => toggleFilter("difficulties", d)}
                                    >
                                        {d}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Flags */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Lists</h3>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={filters.blind75 ? "default" : "outline"}
                                    className={`rounded-lg px-4 h-9 font-medium transition-all ${filters.blind75
                                            ? "bg-indigo-600 border-indigo-600 text-white"
                                            : "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                                        }`}
                                    onClick={() => setFilters({ blind75: filters.blind75 === true ? null : true })}
                                >
                                    Blind 75
                                </Button>
                                <Button
                                    size="sm"
                                    variant={filters.neetcode ? "default" : "outline"}
                                    className={`rounded-lg px-4 h-9 font-medium transition-all ${filters.neetcode
                                            ? "bg-emerald-600 border-emerald-600 text-white"
                                            : "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-indigo-950"
                                        }`}
                                    onClick={() => setFilters({ neetcode: filters.neetcode === true ? null : true })}
                                >
                                    NeetCode
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Companies */}
                    {allCompanies.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Companies</h3>
                            <div className="flex flex-wrap gap-1.5 overflow-hidden">
                                {allCompanies.slice(0, 15).map(c => (
                                    <Badge
                                        key={c}
                                        variant={filters.companies.includes(c) ? "default" : "outline"}
                                        className={`cursor-pointer transition-all text-[10px] ${filters.companies.includes(c)
                                                ? "bg-slate-800 dark:bg-slate-200 border-slate-800 dark:border-slate-200 dark:text-slate-900 text-white"
                                                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800"
                                            }`}
                                        onClick={() => toggleFilter("companies", c)}
                                    >
                                        {c}
                                    </Badge>
                                ))}
                                {allCompanies.length > 15 && <span className="text-xs text-slate-400">+{allCompanies.length - 15} more</span>}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Clear All */}
            {hasActiveFilters && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors gap-2"
                    >
                        <X size={16} />
                        Clear all filters
                    </Button>
                </div>
            )}
        </div>
    );
}
