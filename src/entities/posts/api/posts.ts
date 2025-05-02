
import { getTags } from "../../tag/api"
import { getUsers } from "../../users/api"
import { mapPostsWithUsers } from "../lib/mapPostWithUser"
import { Post, PostResponse } from "../models"

export const getPosts = async (limit: number, skip: number): Promise<PostResponse> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await response.json()
  return data
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

// 태그별 게시물 가져오기 함수
export const getPostsByTag = async (tag: string) => {
  if (!tag || tag === 'all') {
    return { posts: [], total: 0 };
  }
  
  try {
    const [postsData, usersData] = await Promise.all([getTags(tag), getUsers()]);
    const postsWithUsers = mapPostsWithUsers(postsData.posts, usersData.users);
    
    return {
      posts: postsWithUsers,
      total: postsData.total
    };
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error);
    throw error;
  }
};

// Posts와 Users 데이터를 함께 가져와서 조합하는 함수
// 질문 거리 어디에 위치하는 것이 좋을지.
export const getPostsWithUsers = async (limit: number, skip: number) => {
  try {
    // 두 API를 병렬로 호출
    const [postsData, usersData] = await Promise.all([
      getPosts(limit, skip),
      getUsers()
    ]);
    
    // 데이터 매핑 및 조합
    const postsWithUsers = mapPostsWithUsers(postsData.posts, usersData.users);
    
    // 결과 반환
    return {
      posts: postsWithUsers,
      total: postsData.total,
    };
  } catch (error) {
    console.error('포스트와 유저 데이터 조합 중 오류:', error);
    throw error;
  }
};