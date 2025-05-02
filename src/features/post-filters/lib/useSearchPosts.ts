// features/post-filters/lib/useSearchPosts.ts
import { useQueryClient } from "@tanstack/react-query";
import { Post, usePostStore } from "../../../entities/posts/models";
import { usePostFiltersStore } from "../../../entities/posts/models";
import { searchKeys, useSearchPostsQuery } from "../api/queries";

export const useSearchPosts = () => {
  const queryClient = useQueryClient();
  const { setPosts, setTotal } = usePostStore();
  const { searchQuery, setSkip } = usePostFiltersStore();
  
  // useQuery 결과 직접 사용하지 않고 필요한 메서드만 가져옴
  const { refetch } = useSearchPostsQuery(searchQuery);
  
  // 검색 실행 함수
  const executeSearch = async () => {
    if (!searchQuery) return;
    
    // 기존 캐시된 데이터가 있는지 확인
    const cachedData = queryClient.getQueryData(searchKeys.search(searchQuery));
    
    if (cachedData) {
      // 캐시된 데이터가 있으면 사용
      const data = cachedData as { posts: Post[], total: number };
      setPosts(data.posts);
      setTotal(data.total);
      setSkip(0);
    } else {
      // 캐시된 데이터가 없으면 쿼리 실행
      try {
        const result = await refetch();
        if (result.data) {
          setPosts(result.data.posts);
          setTotal(result.data.total);
          setSkip(0);
        }
      } catch (error) {
        console.error("게시물 검색 오류:", error);
      }
    }
  };
  
  return {
    executeSearch,
  };
};