import { useEffect } from "react"
import { usePostsQuery } from "../../../entities/posts/api/queries"
import { usePostFiltersStore, usePostStore } from "../../../entities/posts/models"
import { PostTable } from "../../../features/post-table/ui"
import { PostFiltersPanel } from "../../post-filters-panel/ui/PostFiltersPanel"
import { PostPagination } from "../../post-pagination/ui/PostPagination"

export const PostPanel = () => {
  const { skip, limit, selectedTag, sortBy, sortOrder, searchQuery } = usePostFiltersStore()
  const { data: postsData, isLoading: isPostsLoading } = usePostsQuery({
    skip: skip,
    limit: limit,
    tag: selectedTag,
    sortBy: sortBy,
    sortOrder: sortOrder,
    searchQuery: searchQuery,
  })
  const { setPosts, setTotal } = usePostStore();
  useEffect(() => {
    if (postsData) {
      setPosts(postsData.posts)
      setTotal(postsData.total)
    }
  }, [postsData, setPosts, setTotal])

  return (
    <div className="flex flex-col gap-4">
      <PostFiltersPanel />
      {isPostsLoading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}
      <PostPagination />
    </div>
  )
}
