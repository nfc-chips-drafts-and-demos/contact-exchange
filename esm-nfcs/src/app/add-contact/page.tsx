"use client";
import { useCallback} from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { redirect, useRouter } from "next/navigation";

export default async function AddContact() {
    const router = useRouter();
    const linkContact = useCallback(async () => {
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
          const addContactResult = await fetch("/api/add-contact", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ publicKey: res.publicKey})
          })
          const addContactData = await addContactResult.json()
          if (addContactData.success) {
            router.push("/me")
          }

        } catch (e) {
          // the command has failed, display error to the user
          console.log(e);
          router.push("/add-contact")
        }
      }, []);
    

  return (
    <div>
        <button className="bg-white border rounded border-gray-400 px-4 py-2 font-medium text-md" onClick={linkContact} >Scan Esmeraldan's NFC Tag</button>
    </div>
  );
}