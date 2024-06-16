"use client";
import { Communities } from "@/lib/communities";
// components/InputForm.tsx

import "@/styles/form.css";
import React, { useState, FormEvent } from 'react';
import AvatarEditor from "react-avatar-editor";

interface FormData {
  name: string;
  telegram: string;
  socialLayer: string;
  profileImage: string; // TODO: Make an image
}



export default function InputForm({ defaultName }: { defaultName: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState<string>(defaultName);
  const [telegram, setTelegram] = useState<string>('');
  const [socialLayer, setSocialLayer] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [community, setCommunity] = useState<keyof typeof Communities | "-">("-");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedData({ name, telegram, socialLayer, profileImage });
    setName('');
    setTelegram('');
    setSocialLayer('');
    setProfileImage('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /*
  TODOS
  - style better
  - fix this error: Error: Hydration failed because the initial UI does not match what was rendered on the server.
See more info here: https://nextjs.org/docs/messages/react-hydration-error
   */
  return (
    <div className={`p-4 profile`}>
      <h1 className="font-bold text-lg my-4">Create your Profile</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block">Name:</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block">Telegram handle:</label>
          <input
            name="telegram"
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />
        </div>
        <div>
          <label className="block">Social Layer username:</label>
          <input
            name="social-layer"
            type="text"
            value={socialLayer}
            onChange={(e) => setSocialLayer(e.target.value)}
          />
        </div>
        <div>
          <label className="block">Which community are you primarily affiliated with?</label>
          <select value={community} onChange={(ev) => setCommunity(ev.target.value as any)} name="community">
            <option key="-" disabled={community !== "-"}>- Select -</option>
            {Object.entries(Communities).map(([id, label]) => {
              return <option key={id} value={id.toString()}>{label}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Upload a picture:</label>
          {selectedImage && <img src={selectedImage} alt="Uploaded" style={{ width: '100%', maxWidth: '400px' }} />}
          <input type="file" accept="image/*" onChange={handleImageUpload} name="avatar" />
        </div>
        <div className="mt-4">
          <button className="bg-white border rounded border-gray-400 px-4 py-2 font-medium text-md" type="submit">Submit</button>
        </div>
      </div>
      {submittedData && (
        <div>
          <h3>Profile:</h3>
          <p>Name: {submittedData.name}</p>
          <p>Telegram: {submittedData.telegram}</p>
          <p>Social Layer: {submittedData.socialLayer}</p>
          <p>Uploaded Image:
            {selectedImage && (
              <img src={selectedImage} alt="Uploaded" style={{ width: '100%', maxWidth: '400px' }} />
            )}
          </p>
        </div>
      )}
    </div>
  );
};

