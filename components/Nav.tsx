import React from 'react';
import { CompassIcon } from './icons/CompassIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ActiveView } from '../App';

interface NavProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const NavButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isActive, onClick, children }) => {
  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeClasses = "bg-slate-700 text-white";
  const inactiveClasses = "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200";

  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {children}
    </button>
  );
};

const Nav: React.FC<NavProps> = ({ activeView, setActiveView }) => {
  return (
    <nav className="mb-8 md:mb-12 flex justify-center">
      <div className="flex p-1 space-x-1 bg-slate-800 rounded-lg">
        <NavButton isActive={activeView === 'analyzer'} onClick={() => setActiveView('analyzer')}>
          <CompassIcon className="w-5 h-5" />
          AI Content Strategist
        </NavButton>
        <NavButton isActive={activeView === 'search'} onClick={() => setActiveView('search')}>
          <SearchIcon className="w-5 h-5" />
          YouTube Video Search
        </NavButton>
      </div>
    </nav>
  );
};

export default Nav;