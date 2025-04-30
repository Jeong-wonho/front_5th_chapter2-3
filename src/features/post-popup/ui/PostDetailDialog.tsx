import { Post } from "../../../entities/posts/models"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"

interface PostDetailDialogProps {
    selectedPost: Post
    showPostDetailDialog: boolean
    setShowPostDetailDialog: (showPostDetailDialog: boolean) => void
    searchQuery: string
}

export const PostDetailDialog = ({selectedPost, showPostDetailDialog, setShowPostDetailDialog, searchQuery}: PostDetailDialogProps) => {
    return (
        <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title ?? "", searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body ?? "", searchQuery)}</p>
            {renderComments(selectedPost?.id)}
          </div>
        </DialogContent>
      </Dialog>
    )
}