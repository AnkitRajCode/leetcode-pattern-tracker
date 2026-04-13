import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function formatTitle(filename: string): string {
  const withoutExt = filename.replace(/\.md$/, "");
  return withoutExt.replace(/_/g, " ");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const systemDesignDir = path.join(process.cwd(), "SystemDesgin");
    const filePath = path.join(systemDesignDir, `${slug}.md`);

    // Security check: ensure the resolved path is inside SystemDesgin dir
    if (!filePath.startsWith(systemDesignDir)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const title = formatTitle(`${slug}.md`);

    return NextResponse.json({ content, title, slug });
  } catch (error) {
    console.error("Error reading system design file:", error);
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
