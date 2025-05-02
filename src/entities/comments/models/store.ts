// src/entities/comments/model/store.ts
import { create } from "zustand"
import { Comment } from "./comments"

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
    },
  },

  setComments: (postId, comments) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: comments,
      },
    })),

  setSelectedComment: (comment) => set({ selectedComment: comment }),

  setNewComment: (newComment) =>
    set((state) => {
      if (newComment === null) {
        return {
          newComment: {
            ...state.newComment,
            body: "",
            postId: null,
          },
        }
      }
      if (typeof newComment === "number") {
        return {
          newComment: {
            ...state.newComment,
            postId: newComment,
          },
        }
      }
      return { newComment }
    }),

  addComment: (postId, comment) =>
    set((state) => {
      const newComment = {
        ...comment,
      }

      return {
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), newComment],
        },
      }
    }),

  updateComment: (postId, updatedComment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]:
          state.comments[postId]?.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)) || [],
      },
    })),

  deleteComment: (postId, commentId) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: state.comments[postId]?.filter((comment) => comment.id !== commentId) || [],
      },
    })),

  likeComment: (postId, commentId) =>
    set((state) => {
      // 이미 있는 댓글인지 확인
      const existingComment = state.comments[postId]?.find((c) => c.id === commentId)
      
      
      if (!existingComment) return state // 댓글이 없으면 변경 없음

      // likes가 undefined일 경우 0을 기본값으로 사용
      const currentLikes = existingComment.likes ?? 0;
      // 좋아요 1 증가
      const newLikes = currentLikes + 1
      
      return {
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].map((comment) =>
            comment.id === commentId ? { ...comment, likes: newLikes } : comment,
          ),
        },
      }
    }),
}))
