
import React from 'react';
import { Trees, PenTool, MessageCircle, Sparkles, Briefcase, ShoppingBag } from 'lucide-react';

interface BottomNavProps {
  activeView: string;
  onViewChange: (view: any) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'home', icon: Trees, label: 'Spirit' },
    { id: 'journal', icon: PenTool, label: 'Diary' },
    { id: 'chat', icon: MessageCircle, label: 'Guide' },
    { id: 'gen', icon: Sparkles, label: 'Forge' },
    { id: 'vault', icon: Briefcase, label: 'Vault' },
    { id: 'shop', icon: ShoppingBag, label: 'Market' },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 z-50 rounded-t-[2rem] shadow-2xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 20px)' }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all active:scale-90 ${
              activeView === item.id ? 'text-emerald-600' : 'text-slate-400'
            }`}
          >
            <item.icon size={22} strokeWidth={activeView === item.id ? 2.5 : 2} />
            <span className={`text-[9px] font-bold uppercase tracking-tight ${activeView === item.id ? 'opacity-100' : 'opacity-70'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
