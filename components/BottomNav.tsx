
import type { ReactElement } from 'react';
import { Trees, PenTool, MessageCircle, Sparkles, Briefcase, ShoppingBag } from 'lucide-react';
import { ViewType } from '../types';

interface BottomNavProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const NAV_ITEMS: { id: ViewType; icon: typeof Trees; label: string }[] = [
  { id: 'home', icon: Trees, label: 'Spirit' },
  { id: 'journal', icon: PenTool, label: 'Diary' },
  { id: 'chat', icon: MessageCircle, label: 'Guide' },
  { id: 'gen', icon: Sparkles, label: 'Forge' },
  { id: 'vault', icon: Briefcase, label: 'Vault' },
  { id: 'shop', icon: ShoppingBag, label: 'Market' },
];

function BottomNav({ activeView, onViewChange }: BottomNavProps): ReactElement {
  return (
    <nav
      className="fixed bottom-4 left-4 right-4 mx-auto max-w-[420px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50 px-4 py-3"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
    >
      <div className="flex justify-around items-center">
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90 ${
                isActive
                  ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                  : 'text-slate-500'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <span className="block w-1 h-1 rounded-full bg-purple-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
