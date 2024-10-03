import { create } from 'zustand'

export const useProfileStore = create((set) => ({
    profileData: null,
    posts: [],
    loading: false,

    setProfileData: (data) => set({ profileData: data }),
    setPosts: (posts) => set({ posts }),
    setLoading: (loading) => set({ loading }),
}))