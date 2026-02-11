
import type { ReactElement } from 'react';
import { UserProfile, TreeType } from '../types';
import { ArrowLeft, Check, Lock } from 'lucide-react';

interface TreeCollectionsProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onBack: () => void;
}

const TREE_TYPES: TreeType[] = [
  { id: 'oak', name: 'Oak of Strength', description: 'Grows taller and sturdier with every entry.', color: 'bg-emerald-500/20' },
  { id: 'willow', name: 'Willow of Peace', description: 'Flowing branches that sway with your mood.', color: 'bg-cyan-500/20' },
  { id: 'sakura', name: 'Cherry Blossom', description: 'Premium tree. Blooms with beautiful petals.', color: 'bg-pink-500/20' },
];

function getCardStyle(isSelected: boolean, isUnlocked: boolean): string {
  if (isSelected) return 'border-[var(--accent-border)] bg-[var(--accent-bg)]';
  if (isUnlocked) return 'border-[var(--border)] bg-[var(--bg-surface)]';
  return 'border-[var(--border)] bg-[var(--bg-surface)] opacity-40';
}

function StatusIcon({ isSelected, isUnlocked }: { isSelected: boolean; isUnlocked: boolean }): ReactElement | null {
  if (isSelected) return <div className="bg-[var(--accent)] text-[var(--text-primary)] p-1 rounded-full"><Check size={16} /></div>;
  if (!isUnlocked) return <Lock size={16} className="text-[var(--text-muted)]" />;
  return null;
}

function TreeCollections({ user, setUser, onBack }: TreeCollectionsProps): ReactElement {
  function handleSelect(id: string): void {
    if (user.unlockedTreeTypes.includes(id)) {
      setUser(prev => ({ ...prev, currentTreeTypeId: id }));
    }
  }

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-[var(--text-muted)] font-bold mb-8">
        <ArrowLeft size={18} /> BACK
      </button>

      <h2 className="text-3xl font-black text-[var(--text-primary)] mb-2">Collections</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-8">Choose the spirit that reflects your journey.</p>

      <div className="space-y-4">
        {TREE_TYPES.map(tree => {
          const isUnlocked = user.unlockedTreeTypes.includes(tree.id);
          const isSelected = user.currentTreeTypeId === tree.id;

          return (
            <div
              key={tree.id}
              onClick={() => handleSelect(tree.id)}
              className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer ${getCardStyle(isSelected, isUnlocked)}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl ${tree.color} shadow-lg`} />
                <StatusIcon isSelected={isSelected} isUnlocked={isUnlocked} />
              </div>
              <h3 className="font-black text-[var(--text-primary)]">{tree.name}</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{tree.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TreeCollections;
