import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://leetcode-pattern-tracker.vercel.app'

    // Define your main topics for the sitemap
    const topics = ['arrays', 'strings', 'dp']

    const topicEntries = topics.map((topic) => ({
        url: `${baseUrl}/topics/${topic}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...topicEntries,
    ]
}
