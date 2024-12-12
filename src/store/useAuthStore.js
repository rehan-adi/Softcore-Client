import { create } from 'zustand'
import { getToken, removeToken } from '../utils/token'

const useAuthStore = create(set => ({
  isLoggedIn: !!getToken(),
  login: () => set({ isLoggedIn: true }),
  logout: () => {
    removeToken()
    set({ isLoggedIn: false })
  }
}))

export default useAuthStore
