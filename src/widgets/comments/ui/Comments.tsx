import { Dispatch, SetStateAction } from "react"
import { AddCommentButton } from "../../../features/comments/ui/AddCommentButton"
import { CommentList } from "../../../features/comments/ui/CommentList"
import { Comment } from "../../../entities/comments/models"

interface CommentsProps {
  setNewComment: Dispatch<SetStateAction<Comment>>
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  postId: number
  comments: { [postId: number]: Comment[] }
  setSelectedComment: (comment: Comment) => void
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  deleteComment: (commentId: number, postId: number) => void
  likeComment: (commentId: number, postId: number) => void
  searchQuery: string
}

export const Comments = ({
  setNewComment,
  setShowAddCommentDialog,
  postId,
  comments,
  setSelectedComment,
  setShowEditCommentDialog,
  deleteComment,
  likeComment,
  searchQuery,
}: CommentsProps) => {
  return (
    <div className="mt-2">
      <AddCommentButton
        setNewComment={setNewComment}
        setShowAddCommentDialog={setShowAddCommentDialog}
        postId={postId}
      />
      <CommentList
        postId={postId}
        comments={comments}
        setSelectedComment={setSelectedComment}
        setShowEditCommentDialog={setShowEditCommentDialog}
        deleteComment={deleteComment}
        likeComment={likeComment}
        searchQuery={searchQuery}
      />
    </div>
  )
}
