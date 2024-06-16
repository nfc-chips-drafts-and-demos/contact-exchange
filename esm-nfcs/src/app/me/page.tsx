import { getProfile } from "@/lib/getProfile"
import { getSession } from "../session"
import { Communities } from "@/lib/communities";
import { redirect } from "next/navigation";

function isCommunity(n: number): n is keyof typeof Communities {
  return n in Communities;
}

export default async function Me() {
  const session = await getSession();
  const profile = await getProfile(session.id as string);
  if (!profile) {
    redirect("/");
  }

  const community = isCommunity(profile.community) ? Communities[profile.community] : undefined;

  return (
    <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-2">

      <div className="flex gap-4">
        <img src={profile.avatar_url} className="w-20 h-20 rounded rounded-xl" alt={`Image of ${profile.name}`} />
        <div>
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <div>{profile.email}</div>
          <div>{community && community}</div>
        </div>
      </div>
      <div className="grid grid-cols-8 w-full">
        <div className="col-span-2 font-medium">Telegram</div>
        <div className="col-span-6">{profile.telegram}</div>
        <div className="col-span-2 font-medium">Social Layer</div>
        <div className="col-span-6">{profile.social_layer}</div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex gap-4">
          <h1 className="text-xl font-bold">Connections</h1>
          <div><a href="/add" className="bg-white border rounded border-gray-400 px-4 py-2 font-medium text-sm">Add Connection</a></div>

        </div>
        {profile.connections.length === 0 && <div>
          No connections yet! Find someone with an NFC tag, and click "Add Connection".
        </div>}
        {profile.connections.length > 0 &&
          <div className="flex flex-col gap-4">
            {profile.connections.map((connection => {
              return <div key={connection.id} className="flex gap-4">
                <img src={connection.avatar_url} className="w-8 h-8 rounded" alt={`Image of ${connection.name}`} />
                <div className="text-base font-bold">{connection.name}</div>
              </div>
            }))}</div>}
      </div>
    </div>)
}