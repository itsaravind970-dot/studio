import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { IdeaGenerator } from './components/IdeaGenerator';
import { ScriptWriter } from './components/ScriptWriter';
import { MetadataOptimizer } from './components/MetadataOptimizer';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.IDEATION:
        return <IdeaGenerator />;
      case AppView.SCRIPTING:
        return <ScriptWriter />;
      case AppView.METADATA:
        return <MetadataOptimizer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden font-sans">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-1 overflow-y-auto bg-[#0f0f0f] relative pt-14 pb-20 md:pt-0 md:pb-0 scroll-smooth">
        {/* Ambient background gradient */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-zinc-900 to-transparent pointer-events-none opacity-50" />
        <div className="relative z-10 h-full">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;