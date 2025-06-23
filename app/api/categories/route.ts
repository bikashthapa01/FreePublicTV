import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://iptv-org.github.io/api/categories.json");
    const categories = await res.json();
    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(
      { error: err ? err : "Failed to load categories" },
      { status: 500 }
    );
  }
}
