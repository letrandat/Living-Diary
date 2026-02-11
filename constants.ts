
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
    bg: 'bg-pink-50',
    sky: 'from-blue-200 to-pink-100',
    leaves: '#ffb7c5', // Cherry blossom
    accent: 'text-pink-600'
  },
  [Season.SUMMER]: {
    bg: 'bg-emerald-50',
    sky: 'from-sky-400 to-blue-200',
    leaves: '#2d5a27', // Lush green
    accent: 'text-emerald-700'
  },
  [Season.AUTUMN]: {
    bg: 'bg-orange-50',
    sky: 'from-orange-200 to-amber-100',
    leaves: '#d97706', // Burnt orange
    accent: 'text-orange-700'
  },
  [Season.WINTER]: {
    bg: 'bg-slate-100',
    sky: 'from-indigo-300 to-slate-200',
    leaves: '#e2e8f0', // Snow-covered
    accent: 'text-indigo-800'
  }
};
