"use client";
import { useCallback} from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { useRouter } from "next/navigation";
import React, {useState, useEffect} from 'react';
import '@/styles/status.css';

// client top level (export default) fuctions can't be async
export default function AddContact() {
    const router = useRouter();
    const [addContactStatus, setAddContactStatus] = useState<boolean | null>(null);
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
          setAddContactStatus(addContactData.success)
        } catch (e) {
          console.log(e);
        }
      }, []);
 
  return (
    <div>
        <button className="bg-white border rounded border-gray-400 px-4 py-2 font-medium text-md" onClick={linkContact} >Scan Esmeraldan's NFC Tag</button>
        <footer className={`status-bar ${addContactStatus === null ? '' : addContactStatus ? 'status-success' : 'status-error'}`}>
            {addContactStatus === null ? (
                <h1></h1>
            ) : addContactStatus ? (
                <h1>Successfully added contact! Add another contact.</h1>
            ) : (
                <h1>Error adding contact. Account may not exist or have already been added.</h1>
            )}
        </footer>
    </div> 
  );
}