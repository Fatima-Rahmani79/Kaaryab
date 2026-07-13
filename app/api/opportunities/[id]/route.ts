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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const updates = await req.json();
  const index = db.findIndex((o) => o.id === id);

  if (index === -1)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  db[index] = { ...db[index], ...updates };
  return NextResponse.json(db[index]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  db = db.filter((o) => o.id !== id);
  return NextResponse.json({ success: true });
}
