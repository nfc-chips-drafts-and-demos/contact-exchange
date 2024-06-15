import React, { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  telegram: string;
  socialLayer: string;
  profileImage: string; // TODO: Make an image
}

const InputForm: React.FC = () => {
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
            value={name}
            onChange={(e) => setTelegram(e.target.value)}
          />
        </div>
        <div>
          <label>Social Layer username:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setSocialLayer(e.target.value)}
          />
        </div>
        <div>
          <label>Create a Profile Image:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setProfileImage(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submittedData && (
        <div>
          <h3>Profile:</h3>
          <p>Name: {submittedData.name}</p>
          <p>Name: {submittedData.telegram}</p>
          <p>Name: {submittedData.socialLayer}</p>
          <p>Name: {submittedData.profileImage}</p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
