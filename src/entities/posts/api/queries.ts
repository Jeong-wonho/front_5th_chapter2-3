import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addPostData, deletePostData, getPostsByTag, getPostsWithUsers, updatePostData } from './posts'

// Query Keys
export const postKeys = {
  all: ['posts'] as const,
  filtered: (params: {
    skip: number;
    limit: number;
    tag?: string;
    sortBy?: string;
    sortOrder?: string;
    searchQuery?: string;
  }) => [...postKeys.all, 'filtered', params] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
}

/**
 * 통합된 게시물 쿼리 훅
 * 필터 파라미터를 직접 전달 받음
 */
export const usePostsQuery = (params: {
  skip: number;
  limit: number;
  tag?: string;
  sortBy?: string;
  sortOrder?: string;
  searchQuery?: string;
}) => {
  return useQuery({
    queryKey: postKeys.filtered(params),
    queryFn: async () => {
      // 태그가 있으면 태그별 쿼리 사용
      if (params.tag && params.tag !== 'all') {
        return getPostsByTag(params.tag);
      } else {
        // 아니면 일반 게시물 + 사용자 데이터 쿼리
        return getPostsWithUsers(params.limit, params.skip);
      }
    },
    staleTime: 1000 * 60 * 2, // 2분간 캐시 유지
  });
};
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