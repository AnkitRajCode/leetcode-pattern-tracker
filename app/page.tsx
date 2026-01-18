import Link from "next/link";

const topics = ["arrays", "strings", "dp"];

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        LeetCode Pattern Tracker
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topics.map((t) => (
          <Link
            key={t}
            href={`/topics/${t}`}
            className="p-6 border rounded-xl hover:bg-slate-50 transition"
          >
            <h2 className="text-xl font-semibold capitalize">
              {t}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
