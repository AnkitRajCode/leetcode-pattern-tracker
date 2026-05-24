"use client";

import { useState, useEffect, useCallback } from "react";
import { X, BookMarked, ChevronRight, Loader2, Binary } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface AlgorithmFile {
  slug: string;
  title: string;
  filename: string;
  category: string;
}

interface Category {
  name: string;
  files: AlgorithmFile[];
}

interface AlgorithmsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlgorithmsModal({ isOpen, onClose }: AlgorithmsModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoadingFiles(true);
    fetch("/api/algorithms")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
        if (data.categories?.length > 0 && data.categories[0].files.length > 0 && !selectedSlug) {
          setSelectedSlug(data.categories[0].files[0].slug);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingFiles(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const loadContent = useCallback(async (slug: string) => {
    setLoadingContent(true);
    setContent("");
    try {
      const res = await fetch(`/api/algorithms/${slug}`);
      const data = await res.json();
      setContent(data.content || "");
      setTitle(data.title || slug);
    } catch (err) {
      console.error(err);
      setContent("Failed to load content.");
    } finally {
      setLoadingContent(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSlug) {
      loadContent(selectedSlug);
    }
  }, [selectedSlug, loadContent]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalFiles = categories.reduce((sum, cat) => sum + cat.files.length, 0);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed h-full inset-y-0 right-0 z-50 flex flex-col w-full max-w-5xl bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Algorithms Notes"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
              <Binary size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">Searching & Sorting</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {totalFiles} algorithm{totalFiles !== 1 ? "s" : ""} documented
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            aria-label="Close Algorithms Notes"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
            <div className="p-3">
              {loadingFiles ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={20} className="animate-spin text-slate-400" />
                </div>
              ) : categories.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8 px-2">
                  No algorithm files found.
                </p>
              ) : (
                categories.map((category) => (
                  <div key={category.name} className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 mb-2">
                      {category.name}
                    </p>
                    <ul className="space-y-1">
                      {category.files.map((file) => {
                        const isActive = selectedSlug === file.slug;
                        return (
                          <li key={file.slug}>
                            <button
                              onClick={() => setSelectedSlug(file.slug)}
                              className={`w-full cursor-pointer flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all duration-200 group ${
                                isActive
                                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-500/20"
                                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                              }`}
                              title={file.title}
                            >
                              <BookMarked
                                size={14}
                                className={`shrink-0 ${isActive ? "text-slate-200" : "text-slate-400 group-hover:text-emerald-500"}`}
                              />
                              <span className="truncate leading-snug">{file.title}</span>
                              {isActive && (
                                <ChevronRight size={14} className="shrink-0 ml-auto text-slate-200" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {loadingContent ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 size={28} className="animate-spin text-slate-400" />
              </div>
            ) : content ? (
              <article className="max-w-none prose prose-slate dark:prose-invert prose-headings:font-black prose-code:text-emerald-600 dark:prose-code:text-emerald-400">
                <MarkdownRenderer content={content} />
              </article>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500">
                <Binary size={48} className="mb-4 opacity-30" />
                <p className="text-sm font-medium">Select an algorithm to read</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
