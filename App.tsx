
import { useState, useEffect, type ReactElement } from 'react';
import { Season, UserProfile, JournalEntry, Ornament, ViewType } from './types';
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

  function handleWater(): void {
    setUser(prev => {
      if (prev.dewdrops < 10) return prev;
      return { ...prev, dewdrops: prev.dewdrops - 10, treeHealth: Math.min(100, prev.treeHealth + 15) };
    });
  }

  function handleFertilize(): void {
    setUser(prev => {
      if (prev.dewdrops < 50) return prev;
      return { ...prev, dewdrops: prev.dewdrops - 50, treeLevel: prev.treeLevel + 1 };
    });
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
    </div>
  );
}

export default App;
