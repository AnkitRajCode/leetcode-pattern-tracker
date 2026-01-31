"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/firebase";

export default function FirebaseAnalytics() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            analytics?.then((a) => {
                if (a) {
                    console.log("Firebase Analytics initialized");
                }
            });
        }
    }, []);

    return null;
}
