"use client";

import { config } from "@/config/zuauth";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { zuAuthPopup } from "@pcd/zuauth/client";
import { useCallback, useEffect, useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/Button";
import { SessionData } from "./session";

type AuthState =
  | "logged out"
  | "auth-start"
  | "authenticating"
  | "authenticated"
  | "error";

export default function Home() {
  const [pcdStr, setPcdStr] = useState<string>("");
  const [authState, setAuthState] = useState<AuthState>("logged out");
  const [user, setUser] = useState<Record<string, string> | undefined>();
  const [zupassAuthenticated, setZupassAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      if (authState === "auth-start") {
        const watermark = (await (await fetch("/api/watermark")).json())
          .watermark;
        setAuthState("authenticating");
        const result = await zuAuthPopup({
          zupassUrl: process.env.NEXT_PUBLIC_ZUPASS_SERVER_URL as string,
          fieldsToReveal: {
            revealAttendeeEmail: true,
            revealAttendeeName: true
          },
          watermark,
          config: config
        });

        if (result.type === "pcd") {
          setPcdStr(result.pcdStr);

          const loginResult = await fetch("/api/zupass-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pcd: result.pcdStr })
          });

          setUser((await loginResult.json()).user);
          setZupassAuthenticated(true);
          setAuthState("authenticated");
        } else if (result.type === "popupBlocked") {
          setAuthState("error");
        } else if (result.type === "popupClosed") {
          setAuthState("error");
        } else {
          setAuthState("error");
        }
      }
    })();
  }, [authState]);

  const auth = useCallback(() => {
    if (authState === "logged out" || authState === "error") {
      setAuthState("auth-start");
    }
  }, [authState]);

  const logout = useCallback(() => {
    setUser(undefined);
    setPcdStr("");
    setAuthState("logged out");
  }, []);

  const stateClasses: Record<AuthState, string> = {
    "logged out": "",
    "auth-start": "text-blue-700",
    authenticated: "text-green-700",
    error: "text-red-700",
    authenticating: "text-blue-700"
  };

  const [statusText, setStatusText] = useState<string | undefined>(undefined);
  const [publicKey, setPublicKey] = useState<string | undefined>(undefined);

  const linkTag = useCallback(async () => {
    let command = {
      name: "sign",
      keyNo: 1,
      message: "010203"
    };

    let res;

    try {
        // --- request NFC command execution ---
        res = await execHaloCmdWeb(command);
        // the command has succeeded, display the result to the user
        setStatusText("");
        setPublicKey(res.publicKey);
    } catch (e) {
        // the command has failed, display error to the user
        setStatusText('Error: ' + String(e));
    }
  }, []);

  return (
    <>
    <div className="grid grid-cols-8 items-center gap-y-6">
      <div className="text-2xl font-bold text-emerald-700">1</div>
      <div className="col-span-7"><Button label="Connect with Zupass" disabled={false} onClick={() => setAuthState("auth-start")} /></div>

      <div className="text-2xl font-bold text-emerald-700">2</div>
      <div className="col-span-7"><Button label="Connect your NFC tag" disabled={false} onClick={() => {}} /></div>

      <div className="text-2xl font-bold text-emerald-700">3</div>
      <div className="col-span-7"><Button label="Create your profile" disabled={false} onClick={() => {}} /></div>
    </div>
    </>

  );
//   return (
//     <main
//       className={`flex min-h-screen flex-col items-center justify-between p-24`}
//     >
//       <div className="z-10 max-w-5xl w-full text-sm">
//         <button
//           onClick={authState === "authenticated" ? logout : auth}
//           className="border rounded border-gray-400 px-4 py-2 font-medium text-md"
//           disabled={
//             authState === "auth-start" || authState === "authenticating"
//           }
//         >
//           {authState === "authenticated" ? `Log out` : `Authenticate`}
//         </button>
//         <div className="my-4">
//           Current authentication state is{" "}
//           <span className={`font-semibold ${stateClasses[authState]}`}>
//             {authState}
//           </span>{" "}
//           {user && (
//             <>
//               as{" "}
//               <span className="font-medium text-yellow-700">{`${user.attendeeName} (${user.attendeeEmail})`}</span>
//             </>
//           )}
//         </div>
//         {zupassAuthenticated && (
//           <div className="my-4">
//             <button onClick={linkTag} className="border rounded border-gray-400 px-4 py-2 font-medium text-md"
// >Link my tag</button>
//           </div>)}
//         {publicKey && (
//           <div className="my-4">
//             <div>
//               Public key is {publicKey}
//             </div>
//             <Link href="/create-profile">
//               <button className="border rounded border-gray-400 px-4 py-2 font-medium text-md">
//                 Create Profile
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </main>
//   );
}
