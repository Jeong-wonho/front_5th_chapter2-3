import { Dispatch, SetStateAction } from "react";
import { Comment } from "../../../entities/comments/models"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"

interface EditCommentDialogProps {
    selectedComment: Comment | null
    setSelectedComment: Dispatch<SetStateAction<Comment | null>>;
    showEditCommentDialog: boolean
    setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
    updateComment: () => void
}

export const EditCommentDialog = ({selectedComment,setSelectedComment, showEditCommentDialog, setShowEditCommentDialog, updateComment}: EditCommentDialogProps) => {
    return (
        <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment((prev) => (prev ? { ...prev, body: e.target.value } : null))}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
}