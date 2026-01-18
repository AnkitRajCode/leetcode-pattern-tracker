import { Metadata } from 'next';
import TopicClient from './TopicClient';

type Props = {
  params: Promise<{ topic: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

  return {
    title: `${capitalizedTopic} Mastery`,
    description: `Master ${capitalizedTopic} LeetCode problems with curated patterns, interview tips, and step-by-step solutions. Track your progress in ${capitalizedTopic} data structures and algorithms.`,
    keywords: [`${topic} patterns`, `leetcode ${topic} solutions`, `dsa ${topic} guide`],
    openGraph: {
      title: `${capitalizedTopic} Progress Tracker`,
      description: `Track and master ${capitalizedTopic} patterns on LeetCode.`,
    }
  };
}

export default async function Page({ params }: Props) {
  const { topic } = await params;
  return <TopicClient topic={topic} />;
}
