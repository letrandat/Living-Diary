
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

export const SEASON_COLORS = {
  [Season.SPRING]: {
    bg: 'bg-pink-950/20',
    sky: 'from-[#0a0a0f] via-[#1a0a1f] to-[#0f0a1a]',
    leaves: '#f9a8d4',
    accent: 'text-pink-400'
  },
  [Season.SUMMER]: {
    bg: 'bg-emerald-950/20',
    sky: 'from-[#0a0a0f] via-[#0a1a15] to-[#0a0f1a]',
    leaves: '#34d399',
    accent: 'text-emerald-400'
  },
  [Season.AUTUMN]: {
    bg: 'bg-orange-950/20',
    sky: 'from-[#0a0a0f] via-[#1a0f0a] to-[#0f0a0a]',
    leaves: '#fb923c',
    accent: 'text-orange-400'
  },
  [Season.WINTER]: {
    bg: 'bg-slate-950/20',
    sky: 'from-[#0a0a0f] via-[#0a0a1f] to-[#0f0a1a]',
    leaves: '#94a3b8',
    accent: 'text-slate-300'
  }
};
