
import { useMemo, type ReactElement } from 'react';
import { Season, UserProfile } from '../types';
import { Droplets, Sprout, LayoutGrid } from 'lucide-react';

interface TreeSceneProps {
  season: Season;
  seasonTheme: { sky: string; leaves: string; accent: string };
  user: UserProfile;
  level: number;
  onWater: () => void;
  onFertilize: () => void;
  onOpenCollections: () => void;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function TreeScene({ season, seasonTheme, user, level, onWater, onFertilize, onOpenCollections }: TreeSceneProps): ReactElement {
  const health = user.treeHealth;

  const trunkBaseY = 340;
  const growthHeight = level * 25;
  const trunkHeight = Math.min(60 + growthHeight, 180);
  const trunkTopY = trunkBaseY - trunkHeight;

  const treeStructure = useMemo(() => {
    const rng = seededRandom(Math.floor(level * 1000) + Math.floor(health));
    const branches = [];
    const leaves = [];
    const isWithered = health < 30;

    const branchCount = Math.floor(2 + level * 1.5);
    for (let i = 0; i < branchCount; i++) {
      const angle = (i / branchCount) * Math.PI * 1.5 - Math.PI * 0.75;
      const length = 20 + level * 8;
      const bx = 100 + Math.sin(angle) * length;
      const by = trunkTopY - Math.cos(angle) * (length * 0.5) + (rng() * 20);
      branches.push({ x1: 100, y1: trunkTopY + 20, x2: bx, y2: by });

      const leafDensity = isWithered ? 3 : Math.floor(10 + level * 4);
      for (let j = 0; j < leafDensity; j++) {
        const la = rng() * Math.PI * 2;
        const lr = rng() * (15 + level * 5);
        leaves.push({
          cx: bx + Math.cos(la) * lr,
          cy: by + Math.sin(la) * lr,
          rotation: rng() * 360,
          scale: 0.6 + rng() * 0.6,
          delay: rng() * 2
        });
      }
    }
    return { branches, leaves };
  }, [level, health, trunkTopY]);

  const treeName = user.unlockedTreeTypes.find(t => t === user.currentTreeTypeId)?.toUpperCase() || 'MY TREE';

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

      <div className="absolute top-4 right-4 flex flex-col gap-3 z-50 items-end mt-[env(safe-area-inset-top,0px)]">
        <div className="bg-[var(--bg-surface)] backdrop-blur-2xl px-4 py-2 rounded-full shadow-sm border border-[var(--border)] mb-2 flex items-center gap-2 animate-in slide-in-from-top-4">
           <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">WALLET</span>
           <span className="text-sm font-black text-[var(--secondary)]">💧 {user.dewdrops}</span>
        </div>

        <button
          onClick={onFertilize}
          className="group flex items-center gap-3 bg-[var(--bg-surface)] backdrop-blur-2xl px-4 py-3 rounded-2xl shadow-xl border border-[var(--border)] animate-in slide-in-from-right-4 transition-all active:scale-95"
        >
          <div className="p-2.5 bg-[var(--accent-bg)] rounded-xl text-[var(--accent)] group-hover:scale-110 transition-transform">
            <Sprout size={20} />
          </div>
          <div className="flex flex-col items-start min-w-[90px]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[var(--text-secondary)] uppercase">FERTILIZE</span>
              <span className="text-[10px] font-bold text-[var(--accent)] bg-[var(--accent-bg)] px-1.5 rounded">-50</span>
            </div>
            <span className="text-[10px] font-bold text-[var(--text-muted)] mt-0.5">Level {Math.floor(level)}</span>
            <div className="w-full h-1 bg-[var(--bg-surface-hover)] rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[var(--accent)]" style={{ width: `${(level % 1) * 100}%` }} />
            </div>
          </div>
        </button>

        <button
          onClick={onWater}
          className="group flex items-center gap-3 bg-[var(--bg-surface)] backdrop-blur-2xl px-4 py-3 rounded-2xl shadow-xl border border-[var(--border)] animate-in slide-in-from-right-4 duration-500 transition-all active:scale-95"
        >
          <div className="p-2.5 bg-[var(--secondary-bg)] rounded-xl text-[var(--secondary)] group-hover:scale-110 transition-transform">
            <Droplets size={20} />
          </div>
          <div className="flex flex-col items-start min-w-[90px]">
             <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[var(--text-secondary)] uppercase">WATER</span>
              <span className="text-[10px] font-bold text-[var(--secondary)] bg-[var(--secondary-bg)] px-1.5 rounded">-10</span>
            </div>
            <div className="w-full flex justify-between items-center mt-0.5">
               <span className="text-[10px] font-bold text-[var(--text-muted)]">Health</span>
               <span className="text-[10px] font-bold text-[var(--text-muted)]">{health}%</span>
            </div>
            <div className="w-full h-1.5 bg-[var(--bg-surface-hover)] rounded-full mt-1 overflow-hidden border border-[var(--border)]">
              <div
                className="h-full bg-[var(--secondary)] transition-all duration-1000 shadow-[var(--secondary-glow)]"
                style={{ width: `${health}%` }}
              />
            </div>
          </div>
        </button>
      </div>

      <button
        onClick={onOpenCollections}
        className="absolute top-4 left-4 mt-[env(safe-area-inset-top,0px)] p-3 bg-[var(--bg-surface)] backdrop-blur-2xl rounded-2xl shadow-lg border border-[var(--border)] text-[var(--accent)] active:scale-90 transition-transform"
      >
        <LayoutGrid size={20} />
      </button>

      <div className="relative w-full max-w-sm h-[55vh] flex items-end justify-center pointer-events-none">
        <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--trunk-start)" />
              <stop offset="50%" stopColor="var(--trunk-mid)" />
              <stop offset="100%" stopColor="var(--trunk-end)" />
            </linearGradient>
            <path id="leafPath" d="M0,0 Q5,-8 10,0 Q5,8 0,0 Z" />
          </defs>

          <ellipse cx="100" cy={trunkBaseY + 5} rx="40" ry="8" fill="var(--tree-shadow)" />

          <g className="leaf-sway">
            {treeStructure.branches.map((b, i) => (
              <line
                key={i}
                x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2}
                stroke="var(--trunk-branch)"
                strokeWidth={3 + (level * 0.5)}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            ))}
          </g>

          <path
            d={`M100,${trunkBaseY} L100,${trunkTopY}`}
            fill="none"
            stroke="url(#trunkGradient)"
            strokeWidth={10 + (level * 2)}
            strokeLinecap="round"
            className="trunk-grow"
          />

          <g className="leaf-sway">
            {treeStructure.leaves.map((leaf, i) => (
              <g key={i} transform={`translate(${leaf.cx}, ${leaf.cy}) rotate(${leaf.rotation}) scale(${leaf.scale})`}>
                <use
                  href="#leafPath"
                  fill={seasonTheme.leaves}
                  style={{ animationDelay: `${leaf.delay}s` }}
                  className="transition-all duration-1000"
                />
                {season === Season.WINTER && (
                  <path d="M0,0 Q5,-8 10,0" fill="white" opacity="0.6" />
                )}
              </g>
            ))}
          </g>
        </svg>

        <div className="absolute inset-0 pointer-events-none">
          {user.ornaments.slice(0, 8).map((orn, i) => (
            <div
              key={orn.id}
              className="absolute w-8 h-8 pointer-events-auto leaf-sway"
              style={{
                top: `${((trunkTopY + 20 + (i * 15)) / 400) * 100}%`,
                left: `${((100 + (Math.sin(i * 1.5) * 50)) / 200) * 100}%`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              <img src={orn.url} alt={orn.name} className="w-full h-full rounded-full border-2 border-white/20 shadow-[0_0_12px_rgba(168,85,247,0.2)] transform hover:scale-125 transition-transform" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center z-10 pointer-events-none">
        <h2 className={`text-4xl font-black ${seasonTheme.accent} handwritten drop-shadow-sm`}>
          {treeName}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="px-3 py-1 bg-[var(--bg-surface)] backdrop-blur-sm rounded-full text-[10px] font-black text-[var(--text-muted)] border border-[var(--border)]">
            SPIRIT LEVEL {Math.floor(level)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TreeScene;
