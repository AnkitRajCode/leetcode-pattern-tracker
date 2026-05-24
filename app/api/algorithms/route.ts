import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface AlgorithmFile {
  slug: string;
  title: string;
  filename: string;
  category: string;
}

function formatTitle(filename: string): string {
  const withoutExt = filename.replace(/\.md$/, "");
  // Remove numbering prefix like "01-"
  const withoutNumber = withoutExt.replace(/^\d+-/, "");
  // Replace hyphens with spaces and capitalize
  return withoutNumber
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function GET() {
  try {
    const algorithmsDir = path.join(process.cwd(), "docs", "algorithms");

    if (!fs.existsSync(algorithmsDir)) {
      return NextResponse.json({ categories: [] });
    }

    const categories: { name: string; files: AlgorithmFile[] }[] = [];

    const subDirs = fs
      .readdirSync(algorithmsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const dir of subDirs) {
      const dirPath = path.join(algorithmsDir, dir.name);
      const files = fs
        .readdirSync(dirPath)
        .filter((file) => file.endsWith(".md"))
        .sort()
        .map((file) => ({
          slug: `${dir.name}/${file.replace(/\.md$/, "")}`,
          title: formatTitle(file),
          filename: file,
          category: dir.name,
        }));

      if (files.length > 0) {
        categories.push({
          name: dir.name.charAt(0).toUpperCase() + dir.name.slice(1),
          files,
        });
      }
    }

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error reading algorithms directory:", error);
    return NextResponse.json(
      { error: "Failed to read files" },
      { status: 500 }
    );
  }
}
