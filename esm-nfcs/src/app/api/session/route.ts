import { getSession } from "@/app/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();
  return Response.json(session);
}