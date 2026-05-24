import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function formatTitle(filename: string): string {
  const withoutExt = filename.replace(/\.md$/, "");
  const withoutNumber = withoutExt.replace(/^\d+-/, "");
  return withoutNumber
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;

    if (!slug || slug.length !== 2) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const [category, filename] = slug;
    const algorithmsDir = path.join(process.cwd(), "docs", "algorithms");
    const filePath = path.join(algorithmsDir, category, `${filename}.md`);

    // Security check: ensure the resolved path is inside algorithms dir
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(algorithmsDir))) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const title = formatTitle(`${filename}.md`);

    return NextResponse.json({ content, title, slug: slug.join("/"), category });
  } catch (error) {
    console.error("Error reading algorithm file:", error);
    return NextResponse.json(
      { error: "Failed to read file" },
      { status: 500 }
    );
  }
}
