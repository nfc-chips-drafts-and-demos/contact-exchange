import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/session";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const AddContactSchema = z.object({
    publicKey: z.string(),
})

export async function POST(req: NextRequest) {
    const body = await req.json()

    try {
        const { publicKey } = AddContactSchema.parse(body);
        // you'll make a query that will use that public key
        const contact = await sql`SELECT * FROM profiles where public_key=${publicKey}`;
        if (contact.rowCount == 1) {
            // get the id for that profile (user's id from this session)
            const session = await getSession();
            // insert the current id and the found id to the profile connections table
            await sql`INSERT INTO profile_connections (connection_from, connection_to) values(${session.id},${contact.rows[0].id})`;
            await sql`INSERT INTO profile_connections (connection_from, connection_to) values(${contact.rows[0].id},${session.id})`;
            return NextResponse.json({success: true})
        }
        return NextResponse.json({success: false})
    } catch (error) {
        return NextResponse.json({ error}, {status: 500});
    }
}