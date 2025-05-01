import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment, useCommentStore } from "../../../entities/comments/models"
import { deleteCommentData, patchCommentData } from "../../../entities/comments/api"
import { useState } from "react"
import { EditCommentDialog } from "../../comment-popup/ui"

interface CommentActionProps {
  comment: Comment
  postId: number
}

export const CommentAction = ({ comment, postId }: CommentActionProps) => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const { comments, selectedComment, setSelectedComment, likeComment, deleteComment } = useCommentStore()

  const handleLikeComment = async (id: number, postId: number) => {
    try {
      const data = await patchCommentData(comments, id, postId)
      console.log("likeComment", data);
      likeComment(postId, data.id);
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  const handleDeleteComment = async (id: number, postId: number) => {
    try {
      await deleteCommentData(id)
      deleteComment(postId, id)
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, postId)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment)
            setShowEditCommentDialog(true)
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id, postId)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      <EditCommentDialog
        postId={postId}
        showEditCommentDialog={showEditCommentDialog}
        setShowEditCommentDialog={setShowEditCommentDialog}
        selectedComment={selectedComment}
      />
    </>
  )
}
