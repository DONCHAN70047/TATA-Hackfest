import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import SignUP from './pages/SignUP'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUP" element={<SignUP />} />
    </Routes>
  );
};

export default App;
