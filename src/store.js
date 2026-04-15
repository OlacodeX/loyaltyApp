import { create } from 'zustand'
import { getUserAchievements, getUsers, simulatePurchase } from './api.js'

const initialAchievementsData = {
  unlocked_achievements: [],
  next_available_achievements: [],
  current_badge: '',
  next_badge: '',
  remaining_to_unlock_next_badge: 0,
}

export const usersStore = create((set, get) => ({
  data: [],
  currentPage: 1,
  lastPage: 1,
  totalUsers: 0,
  isLoading: false,
  error: null,
  activeUsersRequestPage: null,
  purchaseModalUserId: null,
  purchaseAmountByUserId: {},
  purchaseLoadingByUserId: {},
  purchaseResultByUserId: {},

  setCurrentPage(page) {
    const nextPage = Math.max(1, page)
    set({ currentPage: nextPage })
  },
  setPurchaseAmount(userId, amount) {
    set((state) => ({
      purchaseAmountByUserId: {
        ...state.purchaseAmountByUserId,
        [userId]: amount,
      },
      purchaseResultByUserId: {
        ...state.purchaseResultByUserId,
        [userId]: null,
      },
    }))
  },
  openPurchaseModal(userId) {
    set((state) => ({
      purchaseModalUserId: userId,
      purchaseResultByUserId: {
        ...state.purchaseResultByUserId,
        [userId]: null,
      },
    }))
  },
  closePurchaseModal() {
    const currentUserId = get().purchaseModalUserId
    if (!currentUserId) {
      set({ purchaseModalUserId: null })
      return
    }

    set((state) => ({
      purchaseModalUserId: null,
      purchaseAmountByUserId: {
        ...state.purchaseAmountByUserId,
        [currentUserId]: '',
      },
    }))
  },

  async fetchUsers(page = get().currentPage) {
    const state = get()
    if (state.isLoading && state.activeUsersRequestPage === page) {
      return
    }

    set({ isLoading: true, error: null, activeUsersRequestPage: page })
    try {
      const response = await getUsers(page)
      const list = Array.isArray(response?.data) ? response.data : []
      const lastPage = Number(response?.meta?.last_page) || 1
      const totalUsers = Number(response?.meta?.total) || list.length

      set({
        data: list,
        currentPage: page,
        lastPage,
        totalUsers,
        isLoading: false,
        error: null,
        activeUsersRequestPage: null,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load data.',
        activeUsersRequestPage: null,
      })
    }
  },

  async simulatePurchaseForUser(userId) {
    const amountRaw = get().purchaseAmountByUserId[userId]
    const amount = Number(amountRaw)

    if (!Number.isFinite(amount) || amount <= 0) {
      set((state) => ({
        purchaseResultByUserId: {
          ...state.purchaseResultByUserId,
          [userId]: { type: 'error', message: 'Enter a valid amount (> 0).' },
        },
      }))
      return false
    }

    set((state) => ({
      purchaseLoadingByUserId: {
        ...state.purchaseLoadingByUserId,
        [userId]: true,
      },
      purchaseResultByUserId: {
        ...state.purchaseResultByUserId,
        [userId]: null,
      },
    }))

    try {
      const response = await simulatePurchase(userId, amount)
      const message =
        response?.message || 'Purchase simulation completed successfully.'

      set((state) => ({
        purchaseLoadingByUserId: {
          ...state.purchaseLoadingByUserId,
          [userId]: false,
        },
        purchaseAmountByUserId: {
          ...state.purchaseAmountByUserId,
          [userId]: '',
        },
        purchaseResultByUserId: {
          ...state.purchaseResultByUserId,
          [userId]: { type: 'success', message },
        },
      }))

      await get().fetchUsers(get().currentPage)
      return true
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to simulate purchase.'

      set((state) => ({
        purchaseLoadingByUserId: {
          ...state.purchaseLoadingByUserId,
          [userId]: false,
        },
        purchaseResultByUserId: {
          ...state.purchaseResultByUserId,
          [userId]: { type: 'error', message },
        },
      }))
      return false
    }
  },
}))

export const useAchievementsStore = create((set, get) => ({
  data: initialAchievementsData,
  isLoading: false,
  error: null,
  activeAchievementsUserId: null,
  async fetchAchievements(userId) {
    const state = useAchievementsStore.getState()
    if (state.isLoading && state.activeAchievementsUserId === userId) {
      return
    }

    set({ isLoading: true, error: null, activeAchievementsUserId: userId })
    try {
      const response = await getUserAchievements(userId)
      const payload = response?.data || response
      const data = {
        ...initialAchievementsData,
        ...(payload || {}),
        unlocked_achievements: Array.isArray(payload?.unlocked_achievements)
          ? payload.unlocked_achievements
          : [],
        next_available_achievements: Array.isArray(
          payload?.next_available_achievements,
        )
          ? payload.next_available_achievements
          : [],
      }
      set({
        data,
        isLoading: false,
        error: null,
        activeAchievementsUserId: null,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load data.',
        activeAchievementsUserId: null,
      })
    }
  },
}))
