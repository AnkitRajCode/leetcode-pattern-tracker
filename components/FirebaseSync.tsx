"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useQuestionStore } from "@/store/questionStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FirebaseSync() {
    const { user } = useAuth();
    const progress = useQuestionStore((s) => s.progress);
    const setProgress = useQuestionStore((s) => s.setProgress);
    const isInitialLoad = useRef(true);
    const lastSyncedProgress = useRef<string>("");

    // Load progress from Firestore on login
    useEffect(() => {
        if (!user) return;

        const loadData = async () => {
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const cloudData = docSnap.data().progress || {};
                    // Merge local and cloud progress
                    const mergedProgress = { ...progress, ...cloudData };

                    if (JSON.stringify(mergedProgress) !== JSON.stringify(progress)) {
                        setProgress(mergedProgress);
                    }
                    lastSyncedProgress.current = JSON.stringify(mergedProgress);
                } else {
                    // New user: push current progress to cloud if any
                    if (Object.keys(progress).length > 0) {
                        await setDoc(docRef, { progress }, { merge: true });
                    }
                    lastSyncedProgress.current = JSON.stringify(progress);
                }
            } catch (error) {
                console.error("Error loading progress from Firestore:", error);
            } finally {
                isInitialLoad.current = false;
            }
        };

        loadData();
    }, [user, setProgress]);

    // Sync progress to Firestore on changes
    useEffect(() => {
        if (!user || isInitialLoad.current) return;

        const currentProgressStr = JSON.stringify(progress);
        if (currentProgressStr === lastSyncedProgress.current) return;

        const saveData = async () => {
            try {
                const docRef = doc(db, "users", user.uid);
                await setDoc(docRef, { progress }, { merge: true });
                lastSyncedProgress.current = currentProgressStr;
            } catch (error) {
                console.error("Error saving progress to Firestore:", error);
            }
        };

        // Debounce save to avoid too many writes
        const timeout = setTimeout(saveData, 2000);
        return () => clearTimeout(timeout);
    }, [progress, user]);

    return null;
}
