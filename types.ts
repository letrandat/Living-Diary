
export enum Season {
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  AUTUMN = 'AUTUMN',
  WINTER = 'WINTER'
}

export interface Ornament {
  id: string;
  url: string;
  name: string;
  date: string;
}

export interface TreeType {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  content: string;
  isPublic: boolean;
  hashtags: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  dewdrops: number;
  treeHealth: number;
  treeLevel: number;
  currentTreeTypeId: string;
  unlockedTreeTypes: string[];
  ornaments: Ornament[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export type ImageSize = '1K' | '2K' | '4K';

export type ViewType = 'home' | 'journal' | 'shop' | 'chat' | 'gen' | 'vault' | 'collections';

export type Theme = 'light' | 'dark';
