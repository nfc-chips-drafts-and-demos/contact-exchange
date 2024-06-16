import { SessionOptions, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  id?: string;
  watermark?: string;
  commitment?: string;
  nameFromZupass?: string;
  emailFromZupass?: string;
  publicKey?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.NEXT_PUBLIC_SESSION_PASSWORD ?? "session-password-which-is-at-least-32-characters-in-length", 
  cookieName: "edge-connect-session",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
  },
};

export async function getSession() {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}