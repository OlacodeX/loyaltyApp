import { create } from 'zustand'
import { getUserAchievements } from '../api/achievementsApi.js'

const initialData = {
  unlocked_achievements: [],
  next_available_achievements: [],
  current_badge: '',
  next_badge: '',
  remaining_to_unlock_next_badge: 0,
}

export const useAchievementsStore = create((set) => ({
  data: initialData,
  isLoading: false,
  error: null,
  async fetchAchievements(userId) {
    set({ isLoading: true, error: null })
    try {
      const data = await getUserAchievements(userId)
      set({ data, isLoading: false, error: null })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load data.',
      })
    }
  },
}))
