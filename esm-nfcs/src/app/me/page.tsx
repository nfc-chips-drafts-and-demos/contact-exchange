import { getProfile } from "@/lib/getProfile"
import { getSession } from "../session"

export default async function Me() {
  const session = await getSession();
  const profile = await getProfile(session.id as string);

  return <div>{JSON.stringify(profile)}</div>
}