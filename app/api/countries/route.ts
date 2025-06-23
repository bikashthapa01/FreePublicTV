import { countries } from "@/lib/sampleData";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(countries);
}
