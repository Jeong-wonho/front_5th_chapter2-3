import { AddCommentButton } from "../../../features/comments/ui/AddCommentButton"
import { CommentList } from "../../../features/comments/ui/CommentList"

interface CommentsProps {
  searchQuery: string
}

export const Comments = ({ searchQuery }: CommentsProps) => {
  return (
    <div className="mt-2">
      <AddCommentButton/>
      <CommentList searchQuery={searchQuery} />
    </div>

    
  )
}
