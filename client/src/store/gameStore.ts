import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FOODIMALS, Foodimal } from '../data/foodimals';

interface GameState {
  username: string | null;
  level: number;
  xp: number;
  coins: number;
  unlockedFoodimals: string[]; // IDs of unlocked foodimals
  dailyChallengeCompleted: boolean;
  lastDailyChallengeDate: string | null;
  
  // Actions
  setUsername: (name: string) => void;
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  unlockFoodimal: (id: string) => void;
  completeDailyChallenge: () => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      username: null,
      level: 1,
      xp: 0,
      coins: 50, // Starting bonus
      unlockedFoodimals: [],
      dailyChallengeCompleted: false,
      lastDailyChallengeDate: null,

      setUsername: (name) => set({ username: name }),

      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        // Simple level up logic: Level * 100 XP needed for next level
        const xpForNextLevel = state.level * 100;
        
        if (newXp >= xpForNextLevel) {
          return { 
            xp: newXp - xpForNextLevel, 
            level: state.level + 1,
            coins: state.coins + 20 // Level up bonus
          };
        }
        return { xp: newXp };
      }),

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

      unlockFoodimal: (id) => set((state) => {
        if (state.unlockedFoodimals.includes(id)) return {};
        return { unlockedFoodimals: [...state.unlockedFoodimals, id] };
      }),

      completeDailyChallenge: () => set({ 
        dailyChallengeCompleted: true, 
        lastDailyChallengeDate: new Date().toISOString().split('T')[0] 
      }),
      
      resetProgress: () => set({
        username: null,
        level: 1,
        xp: 0,
        coins: 50,
        unlockedFoodimals: [],
        dailyChallengeCompleted: false
      })
    }),
    {
      name: 'foodimals-storage',
    }
  )
);

// Helper to check if daily challenge is available
export const isDailyChallengeAvailable = (lastDate: string | null) => {
  if (!lastDate) return true;
  const today = new Date().toISOString().split('T')[0];
  return lastDate !== today;
};
