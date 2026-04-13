import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function formatTitle(filename: string): string {
  // Remove .md extension
  const withoutExt = filename.replace(/\.md$/, "");
  // Replace underscores with spaces
  return withoutExt.replace(/_/g, " ");
}

export async function GET() {
  try {
    const systemDesignDir = path.join(process.cwd(), "SystemDesgin");
    
    if (!fs.existsSync(systemDesignDir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs.readdirSync(systemDesignDir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({
        slug: file.replace(/\.md$/, ""),
        title: formatTitle(file),
        filename: file,
      }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error reading system design directory:", error);
    return NextResponse.json({ error: "Failed to read files" }, { status: 500 });
  }
}
