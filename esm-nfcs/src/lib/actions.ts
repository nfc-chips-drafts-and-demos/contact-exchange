"use server";
import { getSession } from "@/app/session";
import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const CreateProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  telegram: z.string(),
  community: z.string().refine((arg) => parseInt(arg)),
  social_layer: z.string(),
});


export async function createProfile(formData: FormData) {
  "use server";

  const session = await getSession();
  const imageFile = formData.get('avatar') as File;
  const blob = await put(imageFile.name, imageFile, {
    access: 'public',
  });
  revalidatePath('/');

  const id = uuidv4();

  const profile = CreateProfileSchema.parse({
    email: session.emailFromZupass,
    name: formData.get("name"),
    telegram: formData.get("telegram"),
    community: formData.get("community"),
    social_layer: formData.get("social-layer")
  })

  await sql`
  INSERT INTO profiles (id, commitment, public_key, name, email, bio, telegram, community, social_layer, avatar_url)
  VALUES(${id}, ${session.commitment}, ${session.publicKey}, ${profile.name}, ${profile.email}, '',
  ${profile.telegram}, ${profile.community}, ${profile.social_layer}, ${blob.url})
  `

  session.id = id;
  await session.save();
  redirect("/me");
}