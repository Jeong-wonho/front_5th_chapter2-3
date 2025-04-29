import { Post, PostResponse } from "../models"

export const getPosts = async (limit: number, skip: number): Promise<PostResponse> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  return response.json()
}

export const addPostData = async (newPost: Post) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  return data
}

export const updatePostData = async (selectedPost: Post) => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  const data = await response.json()
  return data
}

export const deletePostData = async (postId: number) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })

  // 성공적으로 삭제되었는지 확인 (status 200~299)
  if (response.ok) {
    return postId
  } else {
    // 실패 시 null 반환 (원한다면 에러 메시지 처리도 가능)
    return null
  }
}
