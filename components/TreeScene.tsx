
import React, { useMemo } from 'react';
import { Season, JournalEntry, UserProfile } from '../types';
import { SEASON_COLORS } from '../constants';
import { Droplets, Sprout, LayoutGrid, Zap } from 'lucide-react';

interface TreeSceneProps {
  season: Season;
  user: UserProfile;
  level: number;
  onWater: () => void;
  onFertilize: () => void;
  entries: JournalEntry[];
  onOpenCollections: () => void;
}

const TreeScene: React.FC<TreeSceneProps> = ({ season, user, level, onWater, onFertilize, entries, onOpenCollections }) => {
  const theme = SEASON_COLORS[season];
  const health = user.treeHealth;
  
  // Thông số cấu trúc cây
  const trunkBaseY = 340;
  const growthHeight = level * 25;
  const trunkHeight = Math.min(60 + growthHeight, 180);
  const trunkTopY = trunkBaseY - trunkHeight;

  // Logic tạo cành và lá rõ ràng
  const treeStructure = useMemo(() => {
    const branches = [];
    const leaves = [];
    const isWithered = health < 30;
    
    // 1. Tạo cành chính và cành phụ dựa trên Level
    const branchCount = Math.floor(2 + level * 1.5);
    for (let i = 0; i < branchCount; i++) {
      const angle = (i / branchCount) * Math.PI * 1.5 - Math.PI * 0.75;
      const length = 20 + level * 8;
      const bx = 100 + Math.sin(angle) * length;
      const by = trunkTopY - Math.cos(angle) * (length * 0.5) + (Math.random() * 20);
      branches.push({ x1: 100, y1: trunkTopY + 20, x2: bx, y2: by });

      // 2. Tạo các cụm lá rõ rệt trên mỗi cành
      const leafDensity = isWithered ? 3 : Math.floor(10 + level * 4);
      for (let j = 0; j < leafDensity; j++) {
        const la = Math.random() * Math.PI * 2;
        const lr = Math.random() * (15 + level * 5);
        leaves.push({
          cx: bx + Math.cos(la) * lr,
          cy: by + Math.sin(la) * lr,
          rotation: Math.random() * 360,
          scale: 0.6 + Math.random() * 0.6,
          delay: Math.random() * 2
        });
      }
    }
    return { branches, leaves };
  }, [level, health, trunkTopY]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-24 relative overflow-hidden">
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-1deg) translateY(0); }
          50% { transform: rotate(1deg) translateY(-2px); }
        }
        .leaf-sway {
          animation: sway 3s ease-in-out infinite;
          transform-origin: center;
        }
        .trunk-grow {
          transition: d 1s ease-in-out, stroke-width 1s ease-in-out;
        }
      `}</style>

      {/* TOP RIGHT ACTION HUB - Adjusted spacing for mobile status bar */}
      <div className="absolute top-4 right-4 flex flex-col gap-3 z-50 items-end mt-[env(safe-area-inset-top,0px)]">
        
        {/* WALLET PILL */}
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50 mb-2 flex items-center gap-2 animate-in slide-in-from-top-4">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WALLET</span>
           <span className="text-sm font-black text-blue-600">💧 {user.dewdrops}</span>
        </div>

        {/* FERTILIZE ACTION CARD */}
        <button 
          onClick={onFertilize}
          className="group flex items-center gap-3 bg-white/80 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl border border-white/50 animate-in slide-in-from-right-4 transition-all active:scale-95 hover:bg-emerald-50"
        >
          <div className="p-2.5 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
            <Sprout size={20} />
          </div>
          <div className="flex flex-col items-start min-w-[90px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-700 uppercase">FERTILIZE</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 rounded">-50</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 mt-0.5">Level {Math.floor(level)}</span>
            {/* Level Progress Bar (Visual) */}
            <div className="w-full h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-emerald-400" style={{ width: `${(level % 1) * 100}%` }} />
            </div>
          </div>
        </button>

        {/* WATER ACTION CARD */}
        <button 
          onClick={onWater}
          className="group flex items-center gap-3 bg-white/80 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl border border-white/50 animate-in slide-in-from-right-4 duration-500 transition-all active:scale-95 hover:bg-blue-50"
        >
          <div className="p-2.5 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <Droplets size={20} />
          </div>
          <div className="flex flex-col items-start min-w-[90px]">
             <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-700 uppercase">WATER</span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 rounded">-10</span>
            </div>
            <div className="w-full flex justify-between items-center mt-0.5">
               <span className="text-[10px] font-bold text-slate-400">Health</span>
               <span className="text-[10px] font-bold text-slate-400">{health}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden border border-slate-100">
              <div 
                className="h-full bg-blue-500 transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                style={{ width: `${health}%` }} 
              />
            </div>
          </div>
        </button>

      </div>

      <button 
        onClick={onOpenCollections}
        className="absolute top-4 left-4 mt-[env(safe-area-inset-top,0px)] p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 text-emerald-700 active:scale-90 transition-transform hover:bg-white"
      >
        <LayoutGrid size={20} />
      </button>

      {/* THE ANIMATED TREE */}
      <div className="relative w-full max-w-sm h-[55vh] flex items-end justify-center pointer-events-none">
        <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-2xl overflow-visible">
          {/* Trunk with Gradient */}
          <defs>
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4e342e" />
              <stop offset="50%" stopColor="#5d4037" />
              <stop offset="100%" stopColor="#3e2723" />
            </linearGradient>
            {/* Leaf Shape Definition */}
            <path id="leafPath" d="M0,0 Q5,-8 10,0 Q5,8 0,0 Z" />
          </defs>

          {/* Root/Shadow */}
          <ellipse cx="100" cy={trunkBaseY + 5} rx="40" ry="8" fill="rgba(0,0,0,0.1)" />

          {/* Branches */}
          <g className="leaf-sway">
            {treeStructure.branches.map((b, i) => (
              <line 
                key={i} 
                x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} 
                stroke="#5d4037" 
                strokeWidth={3 + (level * 0.5)} 
                strokeLinecap="round" 
                className="transition-all duration-1000"
              />
            ))}
          </g>

          {/* Trunk */}
          <path 
            d={`M100,${trunkBaseY} L100,${trunkTopY}`} 
            fill="none" 
            stroke="url(#trunkGradient)" 
            strokeWidth={10 + (level * 2)} 
            strokeLinecap="round"
            className="trunk-grow"
          />
          
          {/* Leaves - Now with real leaf shapes */}
          <g className="leaf-sway">
            {treeStructure.leaves.map((leaf, i) => (
              <g key={i} transform={`translate(${leaf.cx}, ${leaf.cy}) rotate(${leaf.rotation}) scale(${leaf.scale})`}>
                <use 
                  href="#leafPath" 
                  fill={theme.leaves} 
                  style={{ animationDelay: `${leaf.delay}s` }}
                  className="transition-all duration-1000"
                />
                {/* Snow cap for leaves in winter */}
                {season === Season.WINTER && (
                  <path d="M0,0 Q5,-8 10,0" fill="white" opacity="0.6" />
                )}
              </g>
            ))}
          </g>
        </svg>

        {/* Ornaments from Vault */}
        <div className="absolute inset-0 pointer-events-none">
          {user.ornaments.slice(0, 8).map((orn, i) => (
            <div 
              key={orn.id} 
              className="absolute w-8 h-8 pointer-events-auto leaf-sway"
              style={{ 
                top: (trunkTopY + 20 + (i * 15)) + 'px', 
                left: (100 + (Math.sin(i * 1.5) * 50)) + 'px',
                animationDelay: `${i * 0.2}s`
              }}
            >
              <img src={orn.url} className="w-full h-full rounded-full border-2 border-white shadow-lg transform hover:scale-125 transition-transform" />
            </div>
          ))}
        </div>
      </div>

      {/* TREE TITLE - Moved slightly up to not overlap with nav */}
      <div className="mt-4 text-center z-10 pointer-events-none">
        <h2 className={`text-4xl font-black ${theme.accent} handwritten drop-shadow-sm`}>
          {user.unlockedTreeTypes.find(t => t === user.currentTreeTypeId)?.toUpperCase() || 'MY TREE'}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-[10px] font-black text-slate-500 border border-white">
            SPIRIT LEVEL {Math.floor(level)}
          </span>
        </div>
      </div>

    </div>
  );
};

export default TreeScene;
