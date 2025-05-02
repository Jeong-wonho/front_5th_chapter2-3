import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPostData, deletePostData, getPostsByTag, getPostsWithUsers, updatePostData } from './posts'

// Query Keys
export const postKeys = {
  all: ['posts'] as const,
  list: (limit: number, skip: number) => [...postKeys.all, 'list', { limit, skip }] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
  byTag: (tag: string) => [...postKeys.all, 'byTag', tag] as const,
  withUsers: (limit: number, skip: number) => [...postKeys.all, 'withUsers', { limit, skip }] as const,
}

// 태그별 게시물 가져오기 쿼리
export const usePostsByTagQuery = (tag: string | null) => {
  return useQuery({
    queryKey: postKeys.byTag(tag || ''),
    queryFn: () => getPostsByTag(tag || ''),
    enabled: !!tag && tag !== 'all', // 태그가 있고 'all'이 아닐 때만 쿼리 활성화
  });
};

// 포스트와 유저 정보를 함께 가져오는 쿼리
export const usePostsWithUsersQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: postKeys.withUsers(limit, skip),
    queryFn: () => getPostsWithUsers(limit, skip),
  })
}

// Mutations
export const useAddPostMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: addPostData,
    onSuccess: () => {
      // 모든 페이지네이션 쿼리를 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updatePostData,
    onSuccess: () => {
      // 모든 페이지네이션 쿼리를 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deletePostData,
    onSuccess: () => {
      // 모든 페이지네이션 쿼리를 무효화
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
} 