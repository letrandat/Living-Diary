
import React, { useState, useEffect } from 'react';
import { Season, UserProfile, JournalEntry, Ornament } from './types';
import { GET_SEASON, SEASON_COLORS } from './constants';
import TreeScene from './components/TreeScene';
import BottomNav from './components/BottomNav';
import JournalView from './components/JournalView';
import SocialHub from './components/SocialHub';
import Shop from './components/Shop';
import AIChat from './components/AIChat';
import ImageGen from './components/ImageGen';
import Vault from './components/Vault';
import TreeCollections from './components/TreeCollections';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'journal' | 'social' | 'shop' | 'chat' | 'gen' | 'vault' | 'collections'>('home');
  const [season] = useState<Season>(GET_SEASON());
  
  // State quản lý User và Dữ liệu
  const [user, setUser] = useState<UserProfile>({
    id: 'USER-777',
    name: 'Gardener',
    dewdrops: 500,
    treeHealth: 85,
    treeLevel: 1,
    currentTreeTypeId: 'oak',
    unlockedTreeTypes: ['oak', 'willow'],
    ornaments: []
  });

  const [visualLevel, setVisualLevel] = useState<number>(user.treeLevel);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('arboria_user');
    const savedEntries = localStorage.getItem('arboria_entries');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedEntries) setEntries(JSON.parse(savedEntries));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('arboria_user', JSON.stringify(user));
    localStorage.setItem('arboria_entries', JSON.stringify(entries));
  }, [user, entries]);

  // Logic tăng trưởng chậm
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setVisualLevel(prev => {
        if (prev < user.treeLevel) return Math.min(user.treeLevel, prev + 0.02);
        return prev;
      });
    }, 2000); 
    return () => clearInterval(growthInterval);
  }, [user.treeLevel]);

  const handleWater = () => {
    if (user.dewdrops >= 10) {
      setUser(prev => ({ ...prev, dewdrops: prev.dewdrops - 10, treeHealth: Math.min(100, prev.treeHealth + 15) }));
    }
  };

  const handleFertilize = () => {
    if (user.dewdrops >= 50) {
      setUser(prev => ({ ...prev, dewdrops: prev.dewdrops - 50, treeLevel: prev.treeLevel + 1 }));
    }
  };

  const theme = SEASON_COLORS[season];

  return (
    // Sử dụng fixed inset-0 để đảm bảo app không bị scroll lung tung trên mobile
    <div className={`fixed inset-0 w-full transition-colors duration-1000 bg-gradient-to-b ${theme.sky} overflow-hidden`}>
      <div className="relative z-10 h-full flex flex-col">
        {/* pb-28 để nội dung không bị che bởi BottomNav cao hơn (do safe area) */}
        <main className="flex-1 relative overflow-y-auto no-scrollbar pb-28 pt-[env(safe-area-inset-top)]">
          {currentView === 'home' && (
            <TreeScene 
              season={season} 
              user={user}
              level={visualLevel} 
              onWater={handleWater}
              onFertilize={handleFertilize}
              entries={entries}
              onOpenCollections={() => setCurrentView('collections')}
            />
          )}
          {currentView === 'journal' && (
            <JournalView 
              entries={entries} 
              currentTreeTypeId={user.currentTreeTypeId}
              onAddEntry={(entry) => {
                setEntries([entry, ...entries]);
                setUser(prev => ({ ...prev, dewdrops: prev.dewdrops + 20 }));
                setCurrentView('home');
              }} 
            />
          )}
          {currentView === 'chat' && <AIChat entries={entries} />}
          {currentView === 'gen' && <ImageGen onGenerated={(ornament: Ornament) => {
            setUser(prev => ({ ...prev, ornaments: [ornament, ...prev.ornaments] }));
          }} />}
          {currentView === 'social' && <SocialHub />}
          {currentView === 'shop' && <Shop user={user} setUser={setUser} />}
          {currentView === 'vault' && <Vault user={user} />}
          {currentView === 'collections' && <TreeCollections user={user} setUser={setUser} onBack={() => setCurrentView('home')} />}
        </main>

        <BottomNav activeView={currentView} onViewChange={setCurrentView} />
      </div>
    </div>
  );
};

export default App;
