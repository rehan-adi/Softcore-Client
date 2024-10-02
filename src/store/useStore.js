import { create } from 'zustand';

export const useStore = create((set) => ({
    isLoggedIn: false,
    username: '',
    login: (name) => set({ isLoggedIn: true, username: name }),
    logout: () => set({ isLoggedIn: false, username: '' }),
}));

