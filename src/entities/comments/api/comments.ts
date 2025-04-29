import { Comment } from "../models"

export const getComments = async (postId: number) => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()
  return data
}

export const addCommentData = async (newComment: Comment) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })
  const data = await response.json()
  return data
}

export const updateCommentData = async (selectedComment: Comment) => {
  const response = await fetch(`/api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })
  const data = await response.json()
  return data
}

export const deleteCommentData = async (commentId: number) => {
  await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  })
}

export const patchCommentData = async (comments: Comment[], id:number, postId:number ) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
      })
      const data = await response.json()
  return data
}