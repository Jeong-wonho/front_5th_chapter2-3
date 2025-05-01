import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Comment } from '../models'
import { addCommentData, deleteCommentData, getComments, patchCommentData, updateCommentData } from './comments'

// Query Keys
export const commentKeys = {
  all: ['comments'] as const,
  list: (postId: number) => [...commentKeys.all, 'list', postId] as const,
  detail: (id: number) => [...commentKeys.all, 'detail', id] as const,
}

// Queries
export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => getComments(postId),
    enabled: !!postId,
  })
}

// Mutations
export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: addCommentData,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.list(data.postId) 
      })
    },
  })
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateCommentData,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.list(data.postId) 
      })
    },
  })
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteCommentData,
    onSuccess: () => {
      // 모든 comments 쿼리를 무효화
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.all 
      })
    },
  })
}

export const usePatchCommentMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ comments, id, postId }: { comments: { [postId: number]: Comment[] }, id: number, postId: number }) =>
      patchCommentData(comments, id, postId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: commentKeys.list(variables.postId) 
      })
    },
  })
} 