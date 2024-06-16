import { redirect } from "next/navigation";
import Home from "./home";
import { getSession } from "./session";

export default async function Page() {
  const session = await getSession();

  if (session.id) {
    redirect("/me");
  }

  if (session.watermark && session.commitment && session.publicKey) {
    redirect("/create-profile");
  }

  redirect("/register");
}
