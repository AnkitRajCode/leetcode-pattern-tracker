"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User as UserIcon, ServerCog } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface UserNavProps {
    onOpenSystemDesign?: () => void;
}

export default function UserNav({ onOpenSystemDesign }: UserNavProps) {
    const { user, signInWithGoogle, logout, loading } = useAuth();

    if (loading) {
        return <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />;
    }

    if (!user) {
        return (
            <Button
                onClick={signInWithGoogle}
                variant="outline"
                className="gap-2 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold"
            >
                <LogIn size={16} />
                Login with Google
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <Link href="/dashboard">
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {user.photoURL ? (
                        <Image
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            width={24}
                            height={24}
                            className="rounded-full ring-2 ring-blue-500/20"
                        />
                    ) : (
                        <UserIcon size={16} className="text-slate-500" />
                    )}
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 hidden sm:block">
                        {user.displayName?.split(' ')[0]}
                    </span>
                </div>
            </Link>

            {/* System Design Notes — only visible when signed in */}
            {onOpenSystemDesign && (
                <button
                    id="system-design-btn"
                    onClick={onOpenSystemDesign}
                    title="System Design Notes"
                    className="p-2.5 cursor-pointer rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-500 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-sm border border-slate-200 dark:border-slate-800"
                    aria-label="Open System Design Notes"
                >
                    <ServerCog size={20} />
                </button>
            )}

            <Button
                onClick={logout}
                variant="ghost"
                size="icon"
                className="cursor-pointer rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors"
                title="Logout"
            >
                <LogOut size={18} />
            </Button>
        </div>
    );
}
