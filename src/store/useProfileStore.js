import { create } from "zustand";

export const useProfileStore = create((set) => ({
    profileData: null,
    posts: [],
    loading: false,

    setProfileData: (profileData) => set(() => ({ profileData })),
    setPosts: (posts) => set(() => ({ posts })),
    setLoading: (loading) => set(() => ({ loading })),
}));
