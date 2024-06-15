import React, { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  age: number;
}

const InputForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedData({ name, age: parseInt(age) });
    setName('');
    setAge('');
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
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submittedData && (
        <div>
          <h3>Submitted Data:</h3>
          <p>Name: {submittedData.name}</p>
          <p>Age: {submittedData.age}</p>
        </div>
      )}
    </div>
  );
};

export default InputForm;
