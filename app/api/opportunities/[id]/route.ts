import { opportunities } from "@/data/opportunities";
import { Opportunity } from "@/types";
import { NextRequest, NextResponse } from "next/server";

let db: Opportunity[] = [...opportunities];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = db.find((o) => o.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}
