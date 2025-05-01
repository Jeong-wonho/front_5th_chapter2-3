import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment } from "../../../entities/comments/models"


interface CommentActionProps {
    comment: Comment
    postId: number
    setSelectedComment: (comment: Comment) => void
    setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
    deleteComment: (commentId: number, postId: number) => void
    likeComment: (commentId: number, postId: number) => void
}

export const CommentAction = ({
    comment,
    postId,
    setSelectedComment,
    setShowEditCommentDialog,
    deleteComment,
    likeComment,
}: CommentActionProps) => {
    return (
        <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
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
            <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
    )
}