import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
  Card,
  CardContent,
} from "../shared/ui"

import { usePostFiltersStore, usePostStore } from "../entities/posts/models"
import { usePostsQuery } from "../entities/posts/api/queries"

import { PostTable } from "../features/post-table/ui"
import { CardHeaderComp } from "../widgets/card-header/ui"
import { PostFiltersPanel } from "../widgets/post-filters-panel/ui/PostFiltersPanel"
import { PostPagination } from "../widgets/post-pagination/ui/PostPagination"

const PostsManager = () => {
  const location = useLocation()

  // PostFilters 스토어에서 필터 상태와 액션 가져오기
  const { 
    skip, limit, selectedTag, sortBy, sortOrder,
    setSkip, setLimit, 
    syncWithUrlParams
  } = usePostFiltersStore();

  const { data: postsData, isLoading: isPostsLoading } = usePostsQuery({
    skip: skip,
    limit: limit,
    tag: selectedTag,
    sortBy: sortBy,
    sortOrder: sortOrder
  });

  const { posts, setPosts, total, setTotal } = usePostStore();

  useEffect(() => {
    if (postsData) {
      setPosts(postsData.posts);
      setTotal(postsData.total);
    }
  }, [postsData, setPosts, setTotal])

  // URL 변경 시 필터 상태 업데이트
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    syncWithUrlParams(params)
  }, [location.search, syncWithUrlParams]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeaderComp/>
      <CardContent>
        {/* 위젯으로 분리! */}
        <div className="flex flex-col gap-4">
          <PostFiltersPanel
          />
          {isPostsLoading  ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts || []}
            />
          )}
          <PostPagination 
            limit={limit} 
            setLimit={setLimit} 
            skip={skip} 
            setSkip={setSkip} 
            total={total || 0} 
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManager
