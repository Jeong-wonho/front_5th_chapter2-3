import { Comment } from "../../../entities/comments/models"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"

interface CreateCommentDialogProps {
    showAddCommentDialog: boolean
    setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
    newComment: Comment
    setNewComment: (newComment: Comment) => void
    addComment: () => void
}
export const CreateCommentDialog = ({showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment, addComment}: CreateCommentDialogProps) => {
    return (
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body || ""}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
    )
}