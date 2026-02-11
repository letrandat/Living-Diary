
import { useState, type ReactElement } from 'react';
import { Trees, PenTool, MessageCircle, Sparkles, Briefcase, ShoppingBag, Users, MoreHorizontal, X } from 'lucide-react';
import type { ViewType } from '../types';

interface BottomNavProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const MAIN_ITEMS: { id: ViewType; icon: typeof Trees; label: string }[] = [
  { id: 'home', icon: Trees, label: 'Spirit' },
  { id: 'journal', icon: PenTool, label: 'Diary' },
  { id: 'social', icon: Users, label: 'Garden' },
  { id: 'chat', icon: MessageCircle, label: 'Guide' },
];

const MORE_ITEMS: { id: ViewType; icon: typeof Trees; label: string }[] = [
  { id: 'gen', icon: Sparkles, label: 'Forge' },
  { id: 'vault', icon: Briefcase, label: 'Vault' },
  { id: 'shop', icon: ShoppingBag, label: 'Market' },
];

const MORE_VIEW_IDS = new Set(MORE_ITEMS.map(i => i.id));

function getActiveClass(isActive: boolean): string {
  return isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]';
}

function getActiveStyle(isActive: boolean): React.CSSProperties | undefined {
  return isActive ? { filter: 'drop-shadow(0 0 8px var(--accent-glow))' } : undefined;
}

function BottomNav({ activeView, onViewChange }: BottomNavProps): ReactElement {
  const [moreOpen, setMoreOpen] = useState(false);
  const isMoreActive = MORE_VIEW_IDS.has(activeView);

  function handleMoreItemClick(id: ViewType): void {
    onViewChange(id);
    setMoreOpen(false);
  }

  return (
    <>
      {/* More menu overlay */}
      {moreOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)}>
          <div
            className="absolute bottom-[88px] right-4 bg-[var(--bg-elevated)] backdrop-blur-2xl border border-[var(--border-strong)] rounded-2xl shadow-2xl p-2 min-w-[160px] animate-in slide-in-from-bottom-4 fade-in"
            style={{ boxShadow: 'var(--shadow-lg)' }}
            onClick={e => e.stopPropagation()}
          >
            {MORE_ITEMS.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMoreItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-[var(--accent-bg)] text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-sm font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Nav bar */}
      <nav
        className="fixed bottom-4 left-4 right-4 mx-auto max-w-[420px] bg-[var(--nav-bg)] backdrop-blur-2xl border border-[var(--border)] rounded-2xl z-50 px-2 py-2"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)', boxShadow: 'var(--shadow-lg)' }}
      >
        <div className="flex justify-around items-center">
          {MAIN_ITEMS.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onViewChange(item.id); setMoreOpen(false); }}
                aria-label={item.label}
                className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition-all active:scale-90 ${getActiveClass(isActive)}`}
                style={getActiveStyle(isActive)}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] font-bold ${getActiveClass(isActive)}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen(prev => !prev)}
            aria-label="More options"
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition-all active:scale-90 ${getActiveClass(moreOpen || isMoreActive)}`}
            style={getActiveStyle(moreOpen || isMoreActive)}
          >
            {moreOpen ? <X size={20} strokeWidth={2.5} /> : <MoreHorizontal size={20} strokeWidth={isMoreActive ? 2.5 : 2} />}
            <span className={`text-[10px] font-bold ${getActiveClass(moreOpen || isMoreActive)}`}>
              More
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default BottomNav;
