
import { useState, useEffect, type ReactElement } from 'react';
import { ShoppingCart, Zap, Droplets, Wind, Package } from 'lucide-react';
import type { UserProfile, UserProfileSetter } from '../types';

interface ShopProps {
  user: UserProfile;
  setUser: UserProfileSetter;
}

const SHOP_ITEMS = [
  { id: 'auto-water', name: 'Auto-Water Sprite', desc: 'Waters your tree for 24 hours automatically.', cost: 200, icon: Droplets, color: 'text-[var(--color-willow)]' },
  { id: 'super-fert', name: 'Golden Fertilizer', desc: 'Instantly increases tree level by 1.', cost: 500, icon: Zap, color: 'text-[var(--color-gold)]' },
  { id: 'sakura-seed', name: 'Sakura Essence', desc: 'Unlocks the Pink Cherry Blossom theme.', cost: 1000, icon: Wind, color: 'text-[var(--color-sakura)]' },
  { id: 'chest', name: 'Ornament Chest', desc: 'Get 3 random AI-forged ornaments.', cost: 350, icon: Package, color: 'text-[var(--color-oak)]' },
] as const;

function Shop({ user, setUser }: ShopProps): ReactElement {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  function handleBuy(id: string, cost: number): void {
    if (user.dewdrops < cost) {
      setToast("Not enough dewdrops! Try journaling more to earn more.");
      return;
    }

    setUser(prev => {
      const updated = { ...prev, dewdrops: prev.dewdrops - cost };

      switch (id) {
        case 'super-fert':
          updated.treeLevel = prev.treeLevel + 1;
          break;
        case 'sakura-seed':
          if (!prev.unlockedTreeTypes.includes('sakura')) {
            updated.unlockedTreeTypes = [...prev.unlockedTreeTypes, 'sakura'];
          }
          break;
        case 'auto-water':
          updated.treeHealth = Math.min(prev.treeHealth + 50, 100);
          break;
        case 'chest': {
          const colors = ['%2334d399', '%23a78bfa', '%23fb923c'];
          const newOrns = colors.map((c, i) => ({
            id: `orn-${Date.now()}-${i}`,
            url: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='${c}'/><circle cx='16' cy='16' r='8' fill='white' opacity='0.3'/></svg>`,
            name: `Mystery Ornament ${i + 1}`,
            date: new Date().toISOString()
          }));
          updated.ornaments = [...prev.ornaments, ...newOrns];
          break;
        }
      }

      return updated;
    });
    setToast("Purchase successful! Arboria thanks you.");
  }

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="flex items-center gap-4 mb-10">
        <ShoppingCart size={32} className="text-[var(--accent)]" />
        <h2 className="text-3xl font-black text-[var(--text-primary)] heading">Green Market</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SHOP_ITEMS.map(item => (
          <div key={item.id} className="bg-[var(--bg-surface)] rounded-3xl p-6 border border-[var(--border)] flex items-start gap-6 hover:bg-[var(--bg-surface-hover)] transition-all group">
            <div className={`w-16 h-16 rounded-2xl bg-[var(--bg-surface)] flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
              <item.icon size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{item.desc}</p>
              <button
                onClick={() => handleBuy(item.id, item.cost)}
                aria-label={`Buy ${item.name} for ${item.cost} dewdrops`}
                className="mt-4 bg-[var(--accent-bg)] text-[var(--accent-light)] px-6 py-2 rounded-full font-bold text-sm border border-[var(--accent-border)] transition-colors flex items-center gap-2"
              >
                <span>💧 {item.cost}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-[var(--border)] rounded-[3rem] p-10 text-[var(--text-primary)] flex flex-col items-center text-center shadow-2xl" style={{ background: 'linear-gradient(to right, var(--accent-bg), var(--secondary-bg))' }}>
        <h3 className="text-2xl font-black mb-4">Out of Dewdrops?</h3>
        <p className="opacity-90 max-w-md mb-8">Support the growth of Arboria by purchasing dewdrop bundles or subscribing for premium seasonal themes.</p>
        <button aria-label="Purchase dewdrop bundles" className="bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] px-10 py-4 rounded-full font-black text-lg hover:bg-[var(--bg-surface-hover)] hover:scale-105 transition-all shadow-xl">
          Purchase Bundles
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--bg-elevated)] backdrop-blur-2xl text-[var(--text-primary)] border border-[var(--border-strong)] px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm animate-in slide-in-from-bottom-4 flex items-center gap-3">
          <span>{toast}</span>
          <button onClick={() => setToast(null)} aria-label="Dismiss notification" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] ml-2">&times;</button>
        </div>
      )}
    </div>
  );
}

export default Shop;
