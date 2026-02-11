
import type { ReactElement } from 'react';
import { Trees, PenTool, MessageCircle, Sparkles, Briefcase, ShoppingBag, Sun, Moon } from 'lucide-react';
import { ViewType } from '../types';
import { useTheme } from '../hooks/useTheme';

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
  const { theme, toggleTheme } = useTheme();
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
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90 text-[var(--text-muted)]"
        >
          {theme === 'dark' ? <Sun size={22} strokeWidth={2} /> : <Moon size={22} strokeWidth={2} />}
        </button>
      </div>
    </nav>
  );
}

export default BottomNav;
