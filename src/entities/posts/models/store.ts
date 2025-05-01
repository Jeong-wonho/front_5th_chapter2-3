import { Post } from "./post";
import { create } from "zustand";

interface PostStore {
    posts: Post[]
    selectedPost: Post | null
    total: number
  
    setPosts: (posts: Post[]) => void
    setSelectedPost: (post: Post | null) => void
    setTotal: (total: number) => void
    
    addPost: (post: Post) => void
    updatePost: (post: Post) => void
    deletePost: (postId: number) => void
  }

  export const usePostStore = create<PostStore>((set) => ({
    // 초기 상태
    posts: [],
    newPost: { id: 1, title: "", body: "", userId: 1 },
    selectedPost: null,
    total: 0,
  
    // 기본 setter
    setPosts: (posts) => set({ posts }),
    setTotal: (total) => set({ total }),
    setSelectedPost: (post) => set({ selectedPost: post }),
  
    // CRUD 액션
    addPost: (post) => set((state) => ({
        posts: [post, ...state.posts],
        total: state.total + 1
      })),
  
    updatePost: (updatedPost) => set((state) => ({
      posts: state.posts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      ),
      selectedPost: null
    })),
  
    deletePost: (postId) => set((state) => ({
      posts: state.posts.filter(post => post.id !== postId),
      total: state.total - 1
    }))
  }))