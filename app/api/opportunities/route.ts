import { opportunities } from "@/data/opportunities";
import { Opportunity, OpportunityFormData } from "@/types";
import { NextRequest, NextResponse } from "next/server";

let db: Opportunity[] = [...opportunities];

export async function GET() {
  return NextResponse.json(db);
}

export async function POST(req: NextRequest) {
  const body: OpportunityFormData = await req.json();

  const newOpportunity: Opportunity = {
    ...body,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  db = [newOpportunity, ...db];
  return NextResponse.json(newOpportunity, { status: 201 });
}
