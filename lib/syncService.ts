import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

/**
 * Persists a list of solved question titles/slugs to Firestore
 */
export async function saveSyncedQuestions(uid: string, questionTitles: string[]) {
    const userDocRef = doc(db, "users", uid);

    try {
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                syncedQuestions: questionTitles,
                lastSync: new Date().toISOString()
            });
        } else {
            await updateDoc(userDocRef, {
                syncedQuestions: arrayUnion(...questionTitles),
                lastSync: new Date().toISOString()
            });
        }
    } catch (error) {
        console.error("Error saving synced questions to Firestore:", error);
        throw error;
    }
}

/**
 * Fetches the list of synced questions for a user from Firestore
 */
export async function getSyncedQuestions(uid: string): Promise<string[]> {
    const userDocRef = doc(db, "users", uid);

    try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data().syncedQuestions || [];
        }
        return [];
    } catch (error) {
        console.error("Error fetching synced questions from Firestore:", error);
        return [];
    }
}

/**
 * Saves the LeetCode username associated with a Firebase user
 */
export async function saveLeetcodeUsername(uid: string, username: string) {
    const userDocRef = doc(db, "users", uid);
    try {
        await setDoc(userDocRef, { leetcodeUsername: username }, { merge: true });
    } catch (error) {
        console.error("Error saving LeetCode username:", error);
    }
}

/**
 * Gets the LeetCode username for a Firebase user
 */
export async function getLeetcodeUsername(uid: string): Promise<string | null> {
    const userDocRef = doc(db, "users", uid);
    try {
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists() ? userDoc.data().leetcodeUsername || null : null;
    } catch (error) {
        console.error("Error getting LeetCode username:", error);
        return null;
    }
}
