
import { Comment } from "../../../entities/comments/models"
import { highlightText } from "../../../shared/lib"
import { CommentAction } from "./CommentAction"

interface CommentListProps {
    postId: number
    comments: { [postId: number]: Comment[] };
    setSelectedComment: (comment: Comment) => void
    setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
    deleteComment: (commentId: number, postId: number) => void
    likeComment: (commentId: number, postId: number) => void
    searchQuery: string
}

export const CommentList = ({
    postId,
    comments,
    setSelectedComment,
    setShowEditCommentDialog,
    deleteComment,
    likeComment,
    searchQuery,
}: CommentListProps) => {
  return (
    <div className="space-y-1">
      {comments[postId]?.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
          </div>
          <CommentAction
            comment={comment}
            postId={postId}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            deleteComment={deleteComment}
            likeComment={likeComment}
          />
        </div>
      ))}
    </div>
  )
}
