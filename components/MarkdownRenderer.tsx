"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
    content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="markdown-content prose prose-slate max-w-none dark:prose-invert transition-colors duration-500 bg-white dark:bg-slate-950 p-6 rounded-xl border border-transparent dark:border-slate-900 shadow-sm">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <div className="rounded-xl overflow-hidden my-6 shadow-lg border border-slate-200 dark:border-slate-800">
                                <div className="bg-slate-800 dark:bg-black px-4 py-2 flex items-center justify-between border-b border-slate-700">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{match[1]}</span>
                                </div>
                                <SyntaxHighlighter
                                    style={vscDarkPlus as any}
                                    language={match[1]}
                                    PreTag="div"
                                    className="!m-0 !p-6"
                                    {...props}
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-md font-mono text-sm" {...props}>
                                {children}
                            </code>
                        );
                    },
                    h1: ({ children }) => <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-8 mb-4 border-b dark:border-slate-800 pb-2">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3 border-b dark:border-slate-800 pb-1">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">{children}</h3>,
                    p: ({ children }) => <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-600 dark:text-slate-400">{children}</ul>,
                    li: ({ children }) => <li className="pl-1">{children}</li>,
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-500/5 p-4 rounded-r-lg italic text-slate-700 dark:text-slate-300 my-4">
                            {children}
                        </blockquote>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-6 rounded-lg border dark:border-slate-800">
                            <table className="w-full text-sm text-left">{children}</table>
                        </div>
                    ),
                    th: ({ children }) => <th className="bg-slate-50 dark:bg-slate-900 p-3 font-bold text-slate-900 dark:text-white border-b dark:border-slate-800">{children}</th>,
                    td: ({ children }) => <td className="p-3 border-b dark:border-slate-800 text-slate-600 dark:text-slate-400">{children}</td>,
                    hr: () => <hr className="my-8 border-slate-200 dark:border-slate-800" />,
                    strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
