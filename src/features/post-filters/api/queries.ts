import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "./postFiltersApi";

export const searchKeys = {
    all: ['postSearch'] as const,
    search: (query: string) => [...searchKeys.all, query] as const,
}

//검색 api 
// 검색 쿼리 훅 (데이터 가져오기)
export const useSearchPostsQuery = (query: string) => {
    return useQuery({
      queryKey: searchKeys.search(query),
      queryFn: () => searchPosts(query),
      // 검색어가 없으면 쿼리 실행 안 함
      enabled: !!query,
      // 검색 결과는 오래 캐시하지 않음
      staleTime: 1000 * 60, // 1분
    });
  };


