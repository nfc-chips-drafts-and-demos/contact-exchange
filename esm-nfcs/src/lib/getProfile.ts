import { sql } from "@vercel/postgres";

interface Profile {
  id: string,
  commitment: string,
  public_key: string,
  name: string,
  email: string,
  telegram: string,
  social_layer: string,
  community: number,
  avatar_url: string
}

interface ProfileWithConnections extends Profile {
  connections: Profile[]
}

export async function getProfile(id: string): Promise<ProfileWithConnections> {
  const result = await sql`SELECT * FROM profiles WHERE id=${id}`;

  const profile: ProfileWithConnections = result.rows[0] as ProfileWithConnections;

  const connections = await sql`SELECT * FROM profiles WHERE id = ANY(SELECT connection_to FROM profile_connections WHERE connection_from = ${id})`;
  profile.connections = connections.rows as Profile[];

  return profile;
}