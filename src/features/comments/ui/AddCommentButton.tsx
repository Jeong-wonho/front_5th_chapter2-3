import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Dispatch, SetStateAction } from "react"
import { Comment } from "../../../entities/comments/models"

interface AddCommentButtonProps {
    setNewComment: Dispatch<SetStateAction<Comment>>
    setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
    postId: number
}
export const AddCommentButton = ({
    setNewComment,
    setShowAddCommentDialog,
    postId,
}: AddCommentButtonProps) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold">댓글</h3>
      <Button
        size="sm"
        onClick={() => {
          setNewComment((prev) => ({ ...prev, postId }))
          setShowAddCommentDialog(true)
        }}
      >
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
  )
}
