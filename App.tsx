import React from 'react';
import TetrisBackground from './components/TetrisBackground';
import Header from './components/Header';
import HomePage from './HomePage';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen overflow-hidden">
      <TetrisBackground />
      <Header />
      <HomePage />
    </div>
  );
};

export default App;