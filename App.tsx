
import { useState, useEffect, type ReactElement } from 'react';
import type { Season, UserProfile, JournalEntry, Ornament, ViewType } from './types';
import { getSeason, SEASON_COLORS, DEFAULT_USER } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import TreeScene from './components/TreeScene';
import BottomNav from './components/BottomNav';
import JournalView from './components/JournalView';
import Shop from './components/Shop';
import AIChat from './components/AIChat';
import ImageGen from './components/ImageGen';
import Vault from './components/Vault';
import TreeCollections from './components/TreeCollections';

function App(): ReactElement {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [season] = useState<Season>(getSeason);

  const [user, setUser] = useLocalStorage<UserProfile>('arboria_user', DEFAULT_USER);
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('arboria_entries', []);

  const [visualLevel, setVisualLevel] = useState<number>(user.treeLevel);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const growthInterval = setInterval(() => {
      setVisualLevel(prev => {
        const next = Math.min(user.treeLevel, prev + 0.02);
        if (next >= user.treeLevel) clearInterval(growthInterval);
        return next;
      });
    }, 2000);
    return () => clearInterval(growthInterval);
  }, [user.treeLevel]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  function handleWater(): void {
    if (user.dewdrops < 10) {
      setToast('Not enough dewdrops to water!');
      return;
    }
    setUser(prev => ({ ...prev, dewdrops: prev.dewdrops - 10, treeHealth: Math.min(100, prev.treeHealth + 15) }));
  }

  function handleFertilize(): void {
    if (user.dewdrops < 50) {
      setToast('Not enough dewdrops to fertilize!');
      return;
    }
    setUser(prev => ({ ...prev, dewdrops: prev.dewdrops - 50, treeLevel: prev.treeLevel + 1 }));
  }

  function handleAddEntry(entry: JournalEntry): void {
    setEntries(prev => [entry, ...prev]);
    setUser(prev => ({ ...prev, dewdrops: prev.dewdrops + 20 }));
    setCurrentView('home');
  }

  function handleOrnamentGenerated(ornament: Ornament): void {
    setUser(prev => ({ ...prev, ornaments: [ornament, ...prev.ornaments] }));
  }

  const { theme: currentTheme } = useTheme();
  const seasonTheme = SEASON_COLORS[season][currentTheme];

  return (
    <div className={`fixed inset-0 w-full transition-colors duration-500 bg-gradient-to-b ${seasonTheme.sky} overflow-hidden`}>
      <div className="relative z-10 h-full flex flex-col">
        <main className="flex-1 relative overflow-y-auto no-scrollbar pb-24 pt-[env(safe-area-inset-top)]">
          {currentView === 'home' && (
            <TreeScene
              season={season}
              seasonTheme={seasonTheme}
              user={user}
              level={visualLevel}
              onWater={handleWater}
              onFertilize={handleFertilize}
              onOpenCollections={() => setCurrentView('collections')}
            />
          )}
          {currentView === 'journal' && (
            <JournalView
              entries={entries}
              currentTreeTypeId={user.currentTreeTypeId}
              userId={user.id}
              onAddEntry={handleAddEntry}
            />
          )}
          {currentView === 'chat' && <AIChat entries={entries} />}
          {currentView === 'gen' && <ImageGen onGenerated={handleOrnamentGenerated} />}
          {currentView === 'shop' && <Shop user={user} setUser={setUser} />}
          {currentView === 'vault' && <Vault user={user} />}
          {currentView === 'collections' && <TreeCollections user={user} setUser={setUser} onBack={() => setCurrentView('home')} />}
        </main>

        <BottomNav activeView={currentView} onViewChange={setCurrentView} />
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] bg-[var(--bg-elevated)] backdrop-blur-2xl text-[var(--text-primary)] border border-[var(--border-strong)] px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm animate-fade-up flex items-center gap-3">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] ml-2">&times;</button>
        </div>
      )}
    </div>
  );
}

export default App;
