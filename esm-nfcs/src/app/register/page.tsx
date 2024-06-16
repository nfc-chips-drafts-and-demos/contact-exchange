import SignInWithZupass from "@/components/SignInWithZupass";
import Home from "../home";
import Zupass from "./zupass";
import { getSession } from "../session";

export default async function Register() {
  const { commitment } = await getSession();

  return (
    <div>
      <Zupass commitment={commitment} />
    </div>
  )
}