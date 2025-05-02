import { useQuery } from '@tanstack/react-query';
import { Tag } from '../models';
import { getTags } from './tag';

// 쿼리 키
export const tagKeys = {
  all: ['tags'] as const,
  list: () => [...tagKeys.all, 'list'] as const,
  byTag: (tag: string) => [...tagKeys.all, 'byTag', tag] as const,
};

// 모든 태그를 가져오는 쿼리
export const useTagsQuery = () => {
  return useQuery<Tag[]>({
    queryKey: tagKeys.list(),
    queryFn: async () => {
        const data = await getTags();
        return data;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  });
};

// 특정 태그로 필터링된 게시물을 가져오는 쿼리
export const useTagPostsQuery = (tag: string | null) => {
  return useQuery({
    queryKey: tagKeys.byTag(tag || ''),
    queryFn: async () => {
      if (!tag || tag === 'all') {
        return { posts: [], total: 0 };
      }
        const data = await getTags(tag);
        return data;
    },
    enabled: !!tag && tag !== 'all', // 태그가 있고 'all'이 아닐 때만 쿼리 활성화
  });
};