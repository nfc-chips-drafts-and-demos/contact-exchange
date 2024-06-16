import { getSession } from "@/app/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { publicKey } = await req.json();
  const session = await getSession();
  session.publicKey = publicKey;
  await session.save();

  return NextResponse.json({ success: true });
}