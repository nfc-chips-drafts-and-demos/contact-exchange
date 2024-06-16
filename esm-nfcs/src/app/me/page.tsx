import { getProfile } from "@/lib/getProfile"
import { getSession } from "../session"
import { Communities } from "@/lib/communities";

function isCommunity(n: number): n is keyof typeof Communities {
  return n in Communities;
}

export default async function Me() {
  const session = await getSession();
  const profile = await getProfile(session.id as string);

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
  </div>)
}