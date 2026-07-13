import { NextRequest, NextResponse } from "next/server";
import { OpportunityFormData } from "@/types";
import { getAllOpportunities, createOpportunity } from "@/lib/mockDb";

export async function GET() {
  return NextResponse.json(getAllOpportunities());
}

export async function POST(req: NextRequest) {
  const body: OpportunityFormData = await req.json();
  const newOpportunity = createOpportunity(body);
  return NextResponse.json(newOpportunity, { status: 201 });
}
