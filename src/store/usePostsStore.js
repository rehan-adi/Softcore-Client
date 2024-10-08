import { create } from "zustand";

export const usePostsStore = create((set) => ({
  posts: [],
  loading: false,

  setPosts: (posts) => set(() => ({ posts })),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (postId, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId ? { ...post, ...updatedPost } : post
      ),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId),
    })),
  setLoading: (loading) => set(() => ({ loading })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === postId
          ? { ...post, likes: post.likes + 1, likedByUser: true }
          : post
      ),
    })),
}));
