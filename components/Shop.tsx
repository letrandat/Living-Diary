
import React from 'react';
import { ShoppingCart, Zap, Droplets, Wind, Package } from 'lucide-react';
import { UserProfile } from '../types';

interface ShopProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const Shop: React.FC<ShopProps> = ({ user, setUser }) => {
  const shopItems = [
    { id: 'auto-water', name: 'Auto-Water Sprite', desc: 'Waters your tree for 24 hours automatically.', cost: 200, icon: Droplets, color: 'text-blue-500' },
    { id: 'super-fert', name: 'Golden Fertilizer', desc: 'Instantly increases tree level by 1.', cost: 500, icon: Zap, color: 'text-amber-500' },
    { id: 'sakura-seed', name: 'Sakura Essence', desc: 'Unlocks the Pink Cherry Blossom theme.', cost: 1000, icon: Wind, color: 'text-pink-500' },
    { id: 'chest', name: 'Ornament Chest', desc: 'Get 3 random AI-forged ornaments.', cost: 350, icon: Package, color: 'text-emerald-500' },
  ];

  const handleBuy = (cost: number) => {
    if (user.dewdrops >= cost) {
      setUser(prev => ({ ...prev, dewdrops: prev.dewdrops - cost }));
      alert("Purchase successful! Arboria thanks you.");
    } else {
      alert("Not enough dewdrops! Try journaling more to earn more.");
    }
  };

  return (
    <div className="w-full h-full p-8 overflow-y-auto">
      <div className="flex items-center gap-4 mb-10">
        <ShoppingCart size={32} className="text-emerald-700" />
        <h2 className="text-3xl font-bold text-emerald-900">Green Market</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shopItems.map(item => (
          <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-start gap-6 hover:shadow-xl transition-all group">
            <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
              <item.icon size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
              <button 
                onClick={() => handleBuy(item.cost)}
                className="mt-4 bg-slate-900 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <span>💧 {item.cost}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-emerald-600 rounded-[3rem] p-10 text-white flex flex-col items-center text-center shadow-2xl">
        <h3 className="text-2xl font-bold mb-4">Out of Dewdrops?</h3>
        <p className="opacity-90 max-w-md mb-8">Support the growth of Arboria by purchasing dewdrop bundles or subscribing for premium seasonal themes.</p>
        <button className="bg-white text-emerald-700 px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-all shadow-xl">
          Purchase Bundles
        </button>
      </div>
    </div>
  );
};

export default Shop;
