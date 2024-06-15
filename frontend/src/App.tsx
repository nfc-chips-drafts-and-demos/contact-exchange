import React from 'react';
import './App.css';
import InputForm from './InputForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile</h1>
        <InputForm />
      </header>
    </div>
  );
}

export default App;
