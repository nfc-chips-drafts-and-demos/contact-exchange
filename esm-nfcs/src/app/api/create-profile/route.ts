import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const CreateProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  bio: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { name, email, bio } = CreateProfileSchema.parse(body);
    const id = uuidv4();
    await sql`INSERT INTO profiles (id, commitment, public_key, name, email, bio, telegram, social_layer, community) VALUES (${id}, '', '', ${name}, ${email}, ${bio}, '', '', 0);`;
    return Response.json({ success: true, id })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}