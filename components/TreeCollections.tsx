
import type { ReactElement } from 'react';
import { UserProfile, TreeType } from '../types';
import { ArrowLeft, Check, Lock } from 'lucide-react';

interface TreeCollectionsProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onBack: () => void;
}

const TREE_TYPES: TreeType[] = [
  { id: 'oak', name: 'Oak of Strength', description: 'Grows taller and sturdier with every entry.', color: 'bg-emerald-600' },
  { id: 'willow', name: 'Willow of Peace', description: 'Flowing branches that sway with your mood.', color: 'bg-blue-400' },
  { id: 'sakura', name: 'Cherry Blossom', description: 'Premium tree. Blooms with beautiful petals.', color: 'bg-pink-300' },
];

function getCardStyle(isSelected: boolean, isUnlocked: boolean): string {
  if (isSelected) return 'border-emerald-500 bg-emerald-50';
  if (isUnlocked) return 'border-slate-100 bg-slate-50';
  return 'border-slate-100 bg-slate-50 opacity-60';
}

function StatusIcon({ isSelected, isUnlocked }: { isSelected: boolean; isUnlocked: boolean }): ReactElement | null {
  if (isSelected) return <div className="bg-emerald-500 text-white p-1 rounded-full"><Check size={16} /></div>;
  if (!isUnlocked) return <Lock size={16} className="text-slate-400" />;
  return null;
}

function TreeCollections({ user, setUser, onBack }: TreeCollectionsProps): ReactElement {
  function handleSelect(id: string): void {
    if (user.unlockedTreeTypes.includes(id)) {
      setUser(prev => ({ ...prev, currentTreeTypeId: id }));
    }
  }

  return (
    <div className="w-full h-full p-6 bg-white overflow-y-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold mb-8">
        <ArrowLeft size={18} /> BACK
      </button>

      <h2 className="text-3xl font-black text-slate-900 mb-2">Collections</h2>
      <p className="text-sm text-slate-500 mb-8">Choose the spirit that reflects your journey.</p>

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
              <h3 className="font-black text-slate-900">{tree.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{tree.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TreeCollections;
