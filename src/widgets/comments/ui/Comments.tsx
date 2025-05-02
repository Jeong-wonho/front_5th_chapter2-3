import { AddCommentButton } from "../../../features/comments/ui/AddCommentButton"
import { CommentList } from "../../../features/comments/ui/CommentList"

export const Comments = () => {
  return (
    <div className="mt-2">
      <AddCommentButton/>
      <CommentList />
    </div>
  )
}
