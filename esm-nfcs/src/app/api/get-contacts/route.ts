import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false } // Adjust based on your database settings
});

export async function GET(req: NextRequest) {
    // TODO: figure out why this is erroring and nothing is printing
    console.log("DEBUGGING hi ")
  try {
    const profiles = await sql`SELECT * FROM profiles`;
    console.log("DEBUGGING")
    console.log(profiles)
    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}