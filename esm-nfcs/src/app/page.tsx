import { redirect } from "next/navigation";
import Home from "./home";
import { getSession } from "./session";

export default async function Page() {
  const session = await getSession();

  if (session.id) {
    return <div>Logged in!</div>;
  }

  if (session.watermark && session.commitment && session.publicKey) {
    return <div>enter profile</div>;
  }

  redirect("/register");
}
