
import { usePostFiltersStore, usePostStore } from "../../../entities/posts/models"
import { highlightText } from "../../../shared/lib"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { Comments } from "../../../widgets/comments/ui"

interface PostDetailDialogProps {
    showPostDetailDialog: boolean
    setShowPostDetailDialog: (showPostDetailDialog: boolean) => void
}

export const PostDetailDialog = ({showPostDetailDialog, setShowPostDetailDialog}: PostDetailDialogProps) => {
  const selectedPost = usePostStore(state => state.selectedPost)
  const { searchQuery } = usePostFiltersStore();
  
    return (
        <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title ?? "", searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body ?? "", searchQuery)}</p>
            {/* 전역 상태 관리 적용후에 주석 해제 */}
            <Comments />
          </div>
        </DialogContent>
      </Dialog>
    )
}