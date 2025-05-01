import { Dispatch, SetStateAction } from "react";
import { Comment, useCommentStore } from "../../../entities/comments/models"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { updateCommentData } from "../../../entities/comments/api";

interface EditCommentDialogProps {
    postId: number
    selectedComment: Comment | null
    showEditCommentDialog: boolean
    setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>;
}

export const EditCommentDialog = ({postId,selectedComment,setShowEditCommentDialog, showEditCommentDialog}: EditCommentDialogProps) => {
    const { updateComment, setSelectedComment} = useCommentStore()
    const handleUpdateComment = async () => {
        try {
          if (!selectedComment) return
          const data = await updateCommentData(selectedComment)
          updateComment(postId, data);
          setShowEditCommentDialog(false)
        } catch (error) {
          console.error("댓글 업데이트 오류:", error)
        }
      }
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
              onChange={(e) => {
                if (selectedComment) {
                  setSelectedComment({ ...selectedComment, body: e.target.value })
                }
              }}
            />
            <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
}