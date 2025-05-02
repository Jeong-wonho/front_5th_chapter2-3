import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import {
  Card,
  CardContent,
} from "../shared/ui"

import { usePostFiltersStore } from "../entities/posts/models"
import { usePostsWithUsersQuery } from "../entities/posts/api/queries"
import { useUsersQuery } from "../entities/users/api/queries"

import { PostTable } from "../features/post-table/ui"
import { CardHeaderComp } from "../widgets/card-header/ui"
import { PostFiltersPanel } from "../widgets/post-filters-panel/ui/PostFiltersPanel"
import { PostPagination } from "../widgets/post-pagination/ui/PostPagination"

const PostsManager = () => {
  const location = useLocation()

  // PostFilters 스토어에서 필터 상태와 액션 가져오기
  const { 
    skip, limit, 
    searchQuery, selectedTag,
    setSkip, setLimit, 
    setSelectedTag,
    syncWithUrlParams
  } = usePostFiltersStore()


  // TanStack Query로 게시물과 사용자 데이터 가져오기
  const { data: usersData, isLoading: isUsersLoading, isError: isUsersError } = useUsersQuery();

  const {data: postsWithUsersData, isLoading: isPostsLoading } = usePostsWithUsersQuery(limit, skip);

  // URL 변경 시 필터 상태 업데이트
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    syncWithUrlParams(params)
  }, [location.search, syncWithUrlParams]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeaderComp/>
      <CardContent>
      
        <div className="flex flex-col gap-4">
          <PostFiltersPanel
          />

          {isPostsLoading || isUsersLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={postsWithUsersData?.posts || []}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
          )}

          <PostPagination 
            limit={limit} 
            setLimit={setLimit} 
            skip={skip} 
            setSkip={setSkip} 
            total={postsWithUsersData?.total || 0} 
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManager
