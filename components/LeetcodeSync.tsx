"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuestionStore } from "@/store/questionStore";
import { useAuth } from "@/context/AuthContext";
import { RefreshCw, Check, AlertCircle } from "lucide-react";
import { saveSyncedQuestions, saveLeetcodeUsername, getLeetcodeUsername, getSyncedQuestions } from "@/lib/syncService";

export default function LeetcodeSync() {
    const { user } = useAuth();
    const { filters, setLeetcodeUsername, syncWithLeetcode, setProgress, progress } = useQuestionStore();
    const [isSyncing, setIsSyncing] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    // Load saved username and history on mount
    useEffect(() => {
        if (user) {
            getLeetcodeUsername(user.uid).then(username => {
                if (username) setLeetcodeUsername(username);
            });

            getSyncedQuestions(user.uid).then(savedTitles => {
                if (savedTitles.length > 0) {
                    const newProgress = { ...progress };
                    savedTitles.forEach(title => {
                        newProgress[title] = { ...newProgress[title], solved: true };
                    });
                    setProgress(newProgress);
                }
            });
        }
    }, [user]);

    const handleSync = async () => {
        if (!user || !filters.leetcodeUsername) return;

        setIsSyncing(true);
        setStatus("idle");
        setMessage("");

        try {
            // Save username to Firebase
            await saveLeetcodeUsername(user.uid, filters.leetcodeUsername);

            // Perfrom sync
            await syncWithLeetcode(user.uid);

            // Get updated list from store and save to Firebase
            const updatedProgress = useQuestionStore.getState().progress;
            const solvedTitles = Object.keys(updatedProgress).filter(title => updatedProgress[title].solved);
            await saveSyncedQuestions(user.uid, solvedTitles);

            setStatus("success");
            setMessage("Synced successfully!");
            setTimeout(() => setStatus("idle"), 3000);
        } catch (error) {
            console.error(error);
            setStatus("error");
            setMessage("Failed to sync. Please check your username.");
        } finally {
            setIsSyncing(false);
        }
    };

    if (!user) return null;

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-blue-500/5">
            <div className="flex flex-col gap-4">
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <RefreshCw size={18} className={isSyncing ? "animate-spin text-blue-500" : "text-blue-500"} />
                        LeetCode Sync
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Automatically sync your recently solved problems.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Input
                        placeholder="LeetCode Username"
                        value={filters.leetcodeUsername}
                        onChange={(e) => setLeetcodeUsername(e.target.value)}
                        className="rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 h-10"
                    />
                    <Button
                        onClick={handleSync}
                        disabled={isSyncing || !filters.leetcodeUsername}
                        className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 h-10"
                    >
                        {isSyncing ? "Syncing..." : "Sync"}
                    </Button>
                </div>

                {status !== "idle" && (
                    <div className={`flex items-center gap-2 text-xs font-medium ${status === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {status === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
