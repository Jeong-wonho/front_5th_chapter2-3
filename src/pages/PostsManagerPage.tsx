import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Card, CardContent } from "../shared/ui"

import { usePostFiltersStore } from "../entities/posts/models"
import { CardHeaderComp } from "../widgets/card-header/ui"
import { PostPanel } from "../widgets/post-panel/ui"

const PostsManager = () => {
  const location = useLocation()

  // PostFilters 스토어에서 필터 상태와 액션 가져오기
  const {syncWithUrlParams } = usePostFiltersStore();

  // URL 변경 시 필터 상태 업데이트
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    syncWithUrlParams(params)
  }, [location.search, syncWithUrlParams])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeaderComp />
      <CardContent>
        <PostPanel />
      </CardContent>
    </Card>
    // 이 외부에 mordal을 두는건 어떤가? 근데 또 모달들도 post를
  )
}

export default PostsManager
