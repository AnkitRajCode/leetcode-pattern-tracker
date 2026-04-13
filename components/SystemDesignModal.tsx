"use client";

import { useState, useEffect, useCallback } from "react";
import { X, BookMarked, ChevronRight, Loader2, ServerCog } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface SystemDesignFile {
  slug: string;
  title: string;
  filename: string;
}

interface SystemDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemDesignModal({ isOpen, onClose }: SystemDesignModalProps) {
  const [files, setFiles] = useState<SystemDesignFile[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  // Load file list when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setLoadingFiles(true);
    fetch("/api/system-design")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        // Auto-select first file
        if (data.files?.length > 0 && !selectedSlug) {
          setSelectedSlug(data.files[0].slug);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingFiles(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Load content when slug changes
  const loadContent = useCallback(async (slug: string) => {
    setLoadingContent(true);
    setContent("");
    try {
      const res = await fetch(`/api/system-design/${encodeURIComponent(slug)}`);
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

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div
        className="fixed h-full inset-y-0 right-0 z-50 flex flex-col w-full max-w-5xl bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="System Design Notes"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
              <ServerCog size={20} className="text-yellow-400 dark:text-yellow-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">System Design Notes</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{files.length} note{files.length !== 1 ? "s" : ""} available</p>
            </div>
          </div>
          <button
            onClick={onClose}
            id="system-design-close-btn"
            className="p-2 cursor-pointer rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            aria-label="Close System Design Notes"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
            <div className="p-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 mb-2">
                Topics
              </p>
              {loadingFiles ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={20} className="animate-spin text-slate-400" />
                </div>
              ) : files.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8 px-2">
                  No markdown files found in SystemDesgin folder.
                </p>
              ) : (
                <ul className="space-y-1">
                  {files.map((file) => {
                    const isActive = selectedSlug === file.slug;
                    return (
                      <li key={file.slug}>
                        <button
                          id={`sd-tab-${file.slug}`}
                          onClick={() => setSelectedSlug(file.slug)}
                          className={`w-full cursor-pointer flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all duration-200 group ${
                            isActive
                              ? "bg-yellow-600 text-white shadow-sm shadow-yellow-500/20"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                          }`}
                          title={file.title}
                        >
                          <BookMarked
                            size={14}
                            className={`shrink-0 ${isActive ? "text-slate-200" : "text-slate-400 group-hover:text-yellow-500"}`}
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
              )}
            </div>
          </aside>

          {/* Content area */}
          <main className="flex-1 overflow-y-auto">
            {loadingContent ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                <Loader2 size={28} className="animate-spin text-yellow-500" />
                <p className="text-sm font-medium">Loading notes…</p>
              </div>
            ) : content ? (
              <div className="p-6 md:p-8">
                {/* File title banner */}
                <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">System Design</span>
                  </div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white">{title}</h1>
                </div>
                <MarkdownRenderer content={content} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400 dark:text-slate-500">
                <ServerCog size={40} className="text-slate-300 dark:text-slate-700" />
                <p className="text-sm font-medium">Select a topic from the sidebar</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
