
import type { ReactElement } from 'react';
import { Trees, PenTool, MessageCircle, Sparkles, Briefcase, ShoppingBag } from 'lucide-react';
import type { ViewType } from '../types';

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
      className="fixed bottom-4 left-4 right-4 mx-auto max-w-[420px] bg-[var(--nav-bg)] backdrop-blur-2xl border border-[var(--border)] rounded-2xl z-50 px-4 py-3"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)', boxShadow: 'var(--shadow-lg)' }}
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
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-muted)]'
              }`}
              style={isActive ? { filter: 'drop-shadow(0 0 8px var(--accent-glow))' } : undefined}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <span className="block w-1 h-1 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
