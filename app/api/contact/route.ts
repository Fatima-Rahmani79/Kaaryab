import { ContactFormData } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: ContactFormData = await req.json();

  console.log("Contact message received:", body);

  return NextResponse.json({ success: true });
}
