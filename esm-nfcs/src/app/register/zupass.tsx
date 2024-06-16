"use client";

import { zuAuthPopup } from "@pcd/zuauth";
import { useCallback, useEffect, useState } from "react";
import { config } from "@/config/zuauth";
import SignInWithZupass from "@/components/SignInWithZupass";
import { Button } from "@/components/Button";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { redirect, useRouter } from "next/navigation";

type AuthState =
  | "logged out"
  | "auth-start"
  | "authenticating"
  | "authenticated"
  | "error";

export default function Zupass({ commitment }: { commitment: string | undefined }) {
  const [pcdStr, setPcdStr] = useState<string>("");
  const [authState, setAuthState] = useState<AuthState>(commitment ? "authenticated" : "logged out");
  const router = useRouter();

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
            revealAttendeeName: true,
            revealAttendeeSemaphoreId: true
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

          const loginData = await loginResult.json();
          if (loginData.id) {
            router.push("/me");
          }

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
  }, [authState, router]);

  const auth = useCallback(() => {
    if (authState === "logged out" || authState === "error") {
      setAuthState("auth-start");
    }
  }, [authState]);

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
      await fetch("/api/set-public-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicKey: res.publicKey })
      });
      router.push("/create-profile");
    } catch (e) {
      // the command has failed, display error to the user
      console.log(e);
    }
  }, []);

  return (
    <div>
      {authState !== "authenticated" &&
        <>
          <div className="my-4">
            To get started, sign in as an Edge Esmeralda attendee using Zupass:
          </div>
          <SignInWithZupass
            loading={
              authState === "auth-start" || authState === "authenticating"
            }
            onClick={auth}
          />
        </>}
      {authState === "authenticated" && (
        <>
          <div className="my-4">
            Register your wristband NFC tag by clicking the button below and then tapping your phone on the wristband.
          </div>
          <div className="my-4">
            <Button disabled={false} label="Register NFC tag" onClick={linkTag} />
          </div>
          <button onClick={async () => {
                  await fetch("/api/set-public-key", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ publicKey: "12345" })
                  });
                  router.push("/create-profile");
          }}>force</button>
        </>
      )}

    </div>
  );
}