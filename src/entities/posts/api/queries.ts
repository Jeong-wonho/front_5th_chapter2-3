import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPostData, deletePostData, getPosts, updatePostData } from './posts'

// Query Keys
export const postKeys = {
  all: ['posts'] as const,
  list: (limit: number, skip: number) => [...postKeys.all, 'list', { limit, skip }] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
}

// Queries
export const usePostsQuery = (limit: number, skip: number) => {
  return useQuery({
    queryKey: postKeys.list(limit, skip),
    queryFn: () => getPosts(limit, skip),
  })
}

// Mutations
export const useAddPostMutation = () => {
  const queryClient = useQueryClient()
  
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