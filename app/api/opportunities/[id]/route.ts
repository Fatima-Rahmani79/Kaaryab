import { NextRequest, NextResponse } from "next/server";
import {
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} from "@/lib/mockDb";
import { getCurrentProfile, createClient } from "@/lib/auth/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = await getOpportunityById(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { profile } = await getCurrentProfile();
  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const authClient = await createClient();
  const { id } = await params;
  const updates = await req.json();
  const updated = await updateOpportunity(id, updates, authClient);
  if (!updated)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { profile } = await getCurrentProfile();
  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const authClient = await createClient();
  const { id } = await params;
  const deleted = await deleteOpportunity(id, authClient);
  if (!deleted)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
