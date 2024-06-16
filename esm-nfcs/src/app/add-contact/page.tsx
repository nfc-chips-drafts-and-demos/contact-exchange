"use client";
import { useCallback} from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { useRouter } from "next/navigation";

export default async function AddContact() {
    const router = useRouter();
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
          // try to add them as a contact
          await fetch("/api/add-contact", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ publicKey: res.publicKey})
          })

        } catch (e) {
          // the command has failed, display error to the user
          console.log(e);
        }
      }, []);
    

  return (
    <div>
        <button onClick={linkTag} >Scan NFC Tag</button>
    </div>
  );
}