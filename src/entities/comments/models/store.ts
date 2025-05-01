// src/entities/comments/model/store.ts
import { create } from 'zustand'
import { Comment } from './comments'

interface CommentStore {
  // 상태
  comments: { [postId: number]: Comment[] }
  selectedComment: Comment | null
  newComment: Comment

  // 액션
  setComments: (postId: number, comments: Comment[]) => void
  setSelectedComment: (comment: Comment | null) => void
  setNewComment: (newComment: Comment | number | null) => void

  addComment: (postId: number, comment: Comment) => void
  updateComment: (postId: number, updatedComment: Comment) => void
  deleteComment: (postId: number, commentId: number) => void
  likeComment: (postId: number, commentId: number) => void
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: {},
  selectedComment: null,
  newComment: {
    id: 1,
    body: "",
    postId: null,
    userId: 1,
    likes: 0,
    user: {
      id: 1,
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      image: "",
    }
  },

  setComments: (postId, comments) => set((state) => ({
    comments: {
      ...state.comments,
      [postId]: comments
    }
  })),

  setSelectedComment: (comment) => set({ selectedComment: comment }),
  
  setNewComment: (newComment) => set((state) => {
    if (newComment === null) {
      return {
        newComment: {
          ...state.newComment,
          body: "",
          postId: null
        }
      }
    }
    if (typeof newComment === "number") {
      return {
        newComment: {
          ...state.newComment,
          postId: newComment
        }
      }
    }
    return { newComment }
  }),
  
  addComment: (postId, comment) => set((state) => {
    // 현재 모든 댓글들의 ID를 확인하여 가장 큰 ID 찾기
    const allComments = Object.values(state.comments).flat();
    const maxId = allComments.length > 0 
      ? Math.max(...allComments.map(c => c.id))
      : 0;

    // 새로운 댓글에 maxId + 1을 ID로 할당
    const newComment = {
      ...comment,
      id: maxId + 1
    };

    return {
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), newComment]
      }
    };
  }),

  updateComment: (postId, updatedComment) => set((state) => ({
    comments: {
      ...state.comments,
      [postId]: state.comments[postId]?.map(comment =>
        comment.id === updatedComment.id ? updatedComment : comment
      ) || []
    }
  })),

  deleteComment: (postId, commentId) => set((state) => ({
    comments: {
      ...state.comments,
      [postId]: state.comments[postId]?.filter(comment => 
        comment.id !== commentId
      ) || []
    }
  })),

  likeComment: (postId, commentId) => set((state) => ({
    comments: {
      ...state.comments,
      [postId]: state.comments[postId]?.map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ) || []
    }
  }))
}))