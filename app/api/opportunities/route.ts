import { NextRequest, NextResponse } from "next/server";
import { OpportunityFormData } from "@/types";
import {
  getApprovedOpportunities,
  getPendingOpportunities,
  createOpportunity,
} from "@/lib/mockDb";
import { getCurrentProfile } from "@/lib/auth/server";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");

  if (status === "pending") {
    const { profile } = await getCurrentProfile();
    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(await getPendingOpportunities());
  }

  return NextResponse.json(await getApprovedOpportunities());
}

export async function POST(req: NextRequest) {
  const body: OpportunityFormData = await req.json();
  const newOpportunity = await createOpportunity(body);
  return NextResponse.json(newOpportunity, { status: 201 });
}
