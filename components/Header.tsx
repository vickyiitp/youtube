
import React from 'react';
import { CompassIcon } from './icons/CompassIcon';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-slate-700/50">
      <div className="container mx-auto flex items-center gap-3">
        <CompassIcon className="w-8 h-8 text-cyan-400"/>
        <h1 className="text-2xl font-bold text-white">Content Compass AI</h1>
      </div>
    </header>
  );
};

export default Header;
