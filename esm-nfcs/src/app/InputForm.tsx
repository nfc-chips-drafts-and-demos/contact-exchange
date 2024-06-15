// components/InputForm.tsx

import React, { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  telegram: string;
  socialLayer: string;
  profileImage: string; // TODO: Make an image
}

const InputForm: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [socialLayer, setSocialLayer] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Telegram handle:</label>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
          />
        </div>
        <div>
          <label>Social Layer username:</label>
          <input
            type="text"
            value={socialLayer}
            onChange={(e) => setSocialLayer(e.target.value)}
          />
        </div>
        <div>
          <label>Upload a picture:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <button type="submit">Submit</button>
      </form>
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

export default InputForm;
