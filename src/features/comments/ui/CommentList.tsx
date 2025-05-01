import { useCommentStore } from "../../../entities/comments/models"
import { usePostStore } from "../../../entities/posts/models"
import { highlightText } from "../../../shared/lib"
import { CommentAction } from "./CommentAction"

interface CommentListProps {
  searchQuery: string
}

export const CommentList = ({ searchQuery }: CommentListProps) => {
  const { selectedPost } = usePostStore()
  const {comments} = useCommentStore()

  
  if (!selectedPost) {
    return null
  }

  const postComments = comments[selectedPost.id] || []
  
  return (
    <div className="space-y-1">
      {postComments.length > 0 && postComments.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
          </div>
          <CommentAction
            comment={comment}
            postId={selectedPost.id}
          />
        </div>
      ))}
    </div>
  )
}
