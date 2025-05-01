import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
} from "../shared/ui"

import { usePostStore } from "../entities/posts/models"
import { Tag } from "../entities/tag/models"
import { getUsers } from "../entities/users/api"
import { mapPostsWithUsers } from "../entities/posts/lib/mapPostWithUser"
import { getTags } from "../entities/tag/api"
import { usePostsQuery } from "../entities/posts/api/queries"
import { useUsersQuery } from "../entities/users/api/queries"

import { PostTable } from "../features/post-table/ui"
import { CardHeaderComp } from "../widgets/card-header/ui"
import { PostFiltersPanel } from "../widgets/post-filters-panel/ui/PostFiltersPanel"
import { PostPagination } from "../widgets/post-pagination/ui/PostPagination"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [tags, setTags] = useState<Tag[]>([])
  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "")
  
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState<string>(queryParams.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get("tag") || "")

  const { posts, setPosts, setTotal } = usePostStore()

  // TanStack Query로 게시물과 사용자 데이터 가져오기
  const { data: postsData, isLoading: isPostsLoading, isError: isPostsError } = usePostsQuery(limit, skip)
  const { data: usersData, isLoading: isUsersLoading, isError: isUsersError } = useUsersQuery()

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const data = await getTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      return
    }
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      return
    }
    try {
      const [postsData, usersData] = await Promise.all([getTags(tag), getUsers()])
      const postsWithUsers = mapPostsWithUsers(postsData.posts, usersData.users)
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
  }

  // 데이터 업데이트
  useEffect(() => {
    try {
      const postsWithUsers = mapPostsWithUsers(postsData?.posts || [], usersData?.users || []);
      setPosts(postsWithUsers);
      setTotal(postsData?.total || 0);
    } catch (error) {
      console.error('매핑 중 에러 발생:', error);
    }
  }, [postsData, usersData, isPostsLoading, isUsersLoading, isPostsError, isUsersError, setPosts, setTotal]);

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeaderComp/>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostFiltersPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchPosts={searchPosts}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            fetchPostsByTag={fetchPostsByTag}
            updateURL={updateURL}
            tags={tags}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {isPostsLoading || isUsersLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts || []}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
            />
          )}

          <PostPagination 
            limit={limit} 
            setLimit={setLimit} 
            skip={skip} 
            setSkip={setSkip} 
            total={postsData?.total || 0} 
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManager
