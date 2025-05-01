import { Post, PostResponse } from "../models"
import { apiFetch } from "../../../shared/lib/api-client"

export const getPosts = async (limit: number, skip: number): Promise<PostResponse> => {
  const response = await apiFetch(`api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
}

export const addPostData = async (newPost: Post) => {
  const response = await apiFetch("api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  const data = await response.json()
  return data
}

export const updatePostData = async (selectedPost: Post) => {
  const response = await apiFetch(`api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  const data = await response.json()
  return data
}

export const deletePostData = async (postId: number) => {
  const response = await apiFetch(`api/posts/${postId}`, {
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
