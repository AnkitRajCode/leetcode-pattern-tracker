import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { username } = await request.json();

        if (!username) {
            return NextResponse.json({ error: "Username is required" }, { status: 400 });
        }

        const graphqlQuery = {
            query: `
                query recentAcSubmissions($username: String!, $limit: Int!) {
                    recentAcSubmissionList(username: $username, limit: $limit) {
                        title
                        titleSlug
                        timestamp
                    }
                }
            `,
            variables: {
                username: username,
                limit: 100
            }
        };

        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com",
            },
            body: JSON.stringify(graphqlQuery),
        });

        if (!response.ok) {
            throw new Error(`LeetCode API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("LeetCode Sync Proxy Error:", error);
        return NextResponse.json({ error: error.message || "Failed to sync with LeetCode" }, { status: 500 });
    }
}
