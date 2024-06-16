import { getProfile } from "@/lib/getProfile"
import { getSession } from "../session"
import { Communities, CommunityId, CommunityThemes } from "@/lib/communities";
import { redirect } from "next/navigation";

function isCommunity(n: number): n is CommunityId {
  return n in Communities;
}

function Community({ id }: { id: CommunityId }) {
  const community = Communities[id];
  const theme = CommunityThemes[id];
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`h-3 w-3 rounded-full bg-${theme}-500`}></div>
      <div>{community}</div>
    </div>
  )
}

export default async function Me() {
  const session = await getSession();
  const profile = await getProfile(session.id as string);
  if (!profile) {
    redirect("/");
  }

  const communityCount = 10;
  const uniqueCommunities = new Set(profile.connections.map(conn => conn.community));

  return (
    <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-2">

      <div className="flex gap-4">
        <img src={profile.avatar_url} className="w-20 h-20 rounded rounded-xl" alt={`Image of ${profile.name}`} />
        <div>
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <div>{profile.email}</div>
          <div>{isCommunity(profile.community)  && <Community id={profile.community} />}</div>
        </div>
      </div>
      <div className="grid grid-cols-8 w-full">
        <div className="col-span-2 font-medium">Telegram</div>
        <div className="col-span-6"><a href={`https://t.me/${profile.telegram}`}>{profile.telegram}</a></div>
        <div className="col-span-2 font-medium">Social Layer</div>
        <div className="col-span-6"><a href={`https://${profile.social_layer}.sociallayer.im`}>{profile.social_layer}</a></div>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex gap-4">
          <h1 className="text-xl font-bold">Connections</h1>
          <div><a href="/add-contact" className="bg-white border rounded border-gray-400 px-4 py-2 font-medium text-sm">Add Connection</a></div>

        </div>
        {profile.connections.length === 0 && <div>
          No connections yet! Find someone with an NFC tag, and tap "Add Connection".
        </div>}
        {profile.connections.length > 0 &&
          <div className="flex flex-col gap-4">
            {uniqueCommunities.size === communityCount && <div></div>}
            {uniqueCommunities.size > communityCount && <div>
              You've met people from <strong>{uniqueCommunities.size}</strong> of the <strong>{communityCount}</strong> communities at Edge Esmeralda. Gotta catch 'em all!
              </div>}
            {profile.connections.map((connection => {
              return <div key={connection.id} className="flex gap-4 items-center">
                <img src={connection.avatar_url} className="w-10 h-10 rounded" alt={`Image of ${connection.name}`} />
                <div>
                  <div className="text-base font-bold">{connection.name}</div>
                {isCommunity(connection.community) && <Community id={connection.community} />}
                </div>
                <button>
                  <a href={`https://t.me/${connection.telegram}`}>Message</a>
                </button>
              </div>
            }))}</div>}
      </div>
    </div>)
}