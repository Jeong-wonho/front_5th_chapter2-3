import { Comment, findCommentById, getIncreasedLikes } from "../models"
import { apiFetch } from "../../../shared/lib/api-client"

export const getComments = async (postId: number) => {
  const response = await apiFetch(`api/comments/post/${postId}`)
  const data = await response.json()
  return data
}

export const addCommentData = async (newComment: Comment) => {
  const response = await apiFetch("api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  const data = await response.json()
  return data
}

export const updateCommentData = async (selectedComment: Comment) => {
  const response = await apiFetch(`api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })
  const data = await response.json()
  return data
}

export const deleteCommentData = async (commentId: number) => {
  const response = await apiFetch(`api/comments/${commentId}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error('Failed to delete comment')
  }
  return commentId
}

export const patchCommentData = async (comments: { [postId: number]: Comment[] }, id: number, postId: number) => {
  const comment = findCommentById(comments, postId, id)
  if (!comment) {
    throw new Error("댓글을 찾을 수 없습니다.")
  }
  
  const response = await apiFetch(`api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: getIncreasedLikes(comment) }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to update comment likes')
  }
  
  const data = await response.json()
  return data
}