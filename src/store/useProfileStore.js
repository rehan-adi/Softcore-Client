import { create } from 'zustand'

export const useProfileStore = create(set => ({
  profileData: null,
  posts: [],
  loading: false,

  setProfileData: profileData => set(() => ({ profileData })),
  setPosts: posts => set(() => ({ posts })),
  setLoading: loading => set(() => ({ loading })),

  deletePost: postId =>
    set(state => ({
      posts: state.posts.filter(post => post._id !== postId)
    })),

  updatePost: updatedPost =>
    set(state => ({
      posts: state.posts.map(post =>
        post._id === updatedPost._id ? updatedPost : post
      )
    }))
}))
