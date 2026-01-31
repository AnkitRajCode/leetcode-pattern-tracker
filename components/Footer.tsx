"use client";

import { Github, Twitter, Linkedin, Code } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-12 px-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 group">
                        <div className="p-2 bg-blue-600 rounded-lg group-hover:rotate-12 transition-transform">
                            <Code size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                            PATTERN<span className="text-blue-600 tracking-normal">TRACKER</span>
                        </span>
                    </div>
                    <p className="text-sm font-medium text-slate-400 max-w-xs">
                        Mastering the logic, one pattern at a time. Designed for modern developers.
                    </p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex items-center gap-4">
                        {[
                            { icon: <Github size={20} />, href: "https://github.com/AnkitRajCode", label: "GitHub" },
                            { icon: <Twitter size={20} />, href: "https://twitter.com/AnkitRajCode", label: "Twitter" },
                            { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/AnkitRajCode", label: "LinkedIn" }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-sm"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-500 flex items-center gap-1.5 pt-2">
                        Made by
                        <a
                            href="https://github.com/AnkitRajCode"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            AnkitRajCode
                        </a>
                        <span className="text-slate-200 dark:text-slate-800">|</span>
                        <span>© {new Date().getFullYear()}</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
