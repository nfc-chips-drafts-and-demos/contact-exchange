import { getSession } from "@/app/session";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    session.destroy();

    return NextResponse.redirect(req.nextUrl.origin + "/");
  } catch (error: any) {
    console.error(`[ERROR] ${error}`);
    return new Response(`Unknown error: ${error.message}`, { status: 500 });
  }
}
