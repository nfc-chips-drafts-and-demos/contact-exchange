"use server";

import { redirect } from "next/navigation";
import { getSession } from "../session";
// @ts-ignore
import InputForm from "./../InputForm";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";


export default async function CreateProfile() {
  const session = await getSession();
  if (!session.commitment || !session.publicKey) {
    redirect("/");
  }

  return (
    <main>
      <InputForm defaultName={session.nameFromZupass ?? ""} />
    </main>
  );
}
