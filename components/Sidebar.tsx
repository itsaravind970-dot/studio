import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, Lightbulb, FileText, Tag, Youtube } from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.IDEATION, label: 'Ideas', icon: Lightbulb },
    { id: AppView.SCRIPTING, label: 'Scripts', icon: FileText },
    { id: AppView.METADATA, label: 'SEO', icon: Tag },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full h-14 bg-[#0f0f0f] border-b border-zinc-800 z-50 flex items-center px-4 justify-between shadow-md">
        <div className="flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-600" />
          <span className="font-bold tracking-tight text-white">
            Creator<span className="text-red-600">Studio</span>
          </span>
        </div>
      </div>

      {/* Responsive Navigation: Bottom Bar (Mobile) / Sidebar (Desktop) */}
      <div className="
        fixed bottom-0 left-0 w-full h-16 bg-[#0f0f0f] border-t border-zinc-800 z-50 flex flex-row justify-around items-center px-2
        md:relative md:w-64 md:h-full md:flex-col md:justify-start md:items-stretch md:border-t-0 md:border-r md:px-0 md:pb-4
      ">
        
        {/* Desktop Logo Section */}
        <div className="hidden md:flex p-6 items-center justify-start gap-3 border-b border-zinc-800">
          <Youtube className="w-8 h-8 text-red-600" />
          <span className="text-xl font-bold tracking-tight text-white">
            Creator<span className="text-red-600">Studio</span>
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 w-full flex flex-row justify-around md:flex-col md:justify-start md:p-4 md:space-y-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`
                  flex flex-col md:flex-row items-center justify-center md:justify-start md:gap-3 
                  p-2 md:p-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'text-red-500 md:bg-red-600/10 md:font-medium' 
                    : 'text-zinc-500 hover:text-zinc-300 md:hover:bg-zinc-900 md:hover:text-zinc-100'
                  }
                `}
              >
                <item.icon className={`w-6 h-6 ${isActive ? 'text-red-500' : 'text-zinc-500 group-hover:text-zinc-300 md:group-hover:text-zinc-100'}`} />
                <span className={`text-[10px] md:text-sm mt-1 md:mt-0 font-medium ${isActive ? 'text-red-500' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Plan Usage - Desktop Only */}
        <div className="hidden md:block p-4 border-t border-zinc-800">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 rounded-xl border border-zinc-700">
            <p className="text-xs text-zinc-400 mb-2">Plan Usage</p>
            <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
              <div className="bg-red-600 h-full w-[75%]"></div>
            </div>
            <p className="text-xs text-zinc-500 mt-2 text-right">750/1000 Tokens</p>
          </div>
        </div>
      </div>
    </>
  );
};