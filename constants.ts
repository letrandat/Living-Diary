
import { Season, UserProfile } from './types';

export function getSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return Season.SPRING;
  if (month >= 5 && month <= 7) return Season.SUMMER;
  if (month >= 8 && month <= 10) return Season.AUTUMN;
  return Season.WINTER;
}

export const DEFAULT_USER: UserProfile = {
  id: 'USER-777',
  name: 'Gardener',
  dewdrops: 500,
  treeHealth: 85,
  treeLevel: 1,
  currentTreeTypeId: 'oak',
  unlockedTreeTypes: ['oak', 'willow'],
  ornaments: []
};

interface SeasonTheme {
  sky: string;
  leaves: string;
  accent: string;
}

export const SEASON_COLORS: Record<Season, { dark: SeasonTheme; light: SeasonTheme }> = {
  [Season.SPRING]: {
    dark: { sky: 'from-[#0a0a0f] via-[#1a0a1f] to-[#0f0a1a]', leaves: '#f9a8d4', accent: 'text-pink-400' },
    light: { sky: 'from-[#fdf2f8] via-[#fce7f3] to-[#f5f3ff]', leaves: '#ec4899', accent: 'text-pink-600' },
  },
  [Season.SUMMER]: {
    dark: { sky: 'from-[#0a0a0f] via-[#0a1a15] to-[#0a0f1a]', leaves: '#34d399', accent: 'text-emerald-400' },
    light: { sky: 'from-[#ecfdf5] via-[#d1fae5] to-[#f0fdfa]', leaves: '#059669', accent: 'text-emerald-600' },
  },
  [Season.AUTUMN]: {
    dark: { sky: 'from-[#0a0a0f] via-[#1a0f0a] to-[#0f0a0a]', leaves: '#fb923c', accent: 'text-orange-400' },
    light: { sky: 'from-[#fff7ed] via-[#ffedd5] to-[#fef3c7]', leaves: '#ea580c', accent: 'text-orange-600' },
  },
  [Season.WINTER]: {
    dark: { sky: 'from-[#0a0a0f] via-[#0a0a1f] to-[#0f0a1a]', leaves: '#94a3b8', accent: 'text-slate-300' },
    light: { sky: 'from-[#f8fafc] via-[#e2e8f0] to-[#f1f5f9]', leaves: '#64748b', accent: 'text-slate-600' },
  },
};
