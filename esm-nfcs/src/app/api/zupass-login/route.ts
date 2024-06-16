import { getSession } from "@/app/session";
import { config } from "@/config/zuauth";
import { getIdForCommitment } from "@/lib/getProfile";
import { authenticate } from "@pcd/zuauth/server";
import { NextRequest } from "next/server";

/**
 * Once the front-end has received a PCD from the popup window, it sends it to
 * the back-end for verification.
 *
 * Calling {@link authenticate} will check that the PCD is cryptographically
 * valid, has the correct watermark, and that its contents match the expected
 * event config (public key, event ID, product ID).
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.pcd || !(typeof body.pcd === "string")) {
    console.error(`[ERROR] No PCD specified`);
    return new Response("No PCD specified", { status: 400 });
  }

  try {
    const session = await getSession(); 
    const pcd = await authenticate(body.pcd, session.watermark ?? "", config);
    session.commitment = pcd.claim.partialTicket.attendeeSemaphoreId;
    session.emailFromZupass = pcd.claim.partialTicket.attendeeEmail;
    session.nameFromZupass = pcd.claim.partialTicket.attendeeName;

    const id = await getIdForCommitment(session.commitment as string);
    if (id) {
      session.id = id;
    }

    await session.save();
    return Response.json({
      success: true,
      id
    });
  } catch (e) {
    console.error(`[ERROR] ${e}`);
    return new Response(
      e instanceof Error ? e.message : "An unexpected error occurred",
      { status: 400 }
    );
  }
}
