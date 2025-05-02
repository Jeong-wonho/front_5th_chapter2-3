import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment, useCommentStore } from "../../../entities/comments/models"
import { useState } from "react"
import { EditCommentDialog } from "../../comment-popup/ui"
import { useDeleteCommentMutation, usePatchCommentMutation } from "../../../entities/comments/api/queries"

interface CommentActionProps {
  comment: Comment
  postId: number
}

export const CommentAction = ({ comment, postId }: CommentActionProps) => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const { comments, selectedComment, setSelectedComment, likeComment, deleteComment } = useCommentStore()

  const patchCommentMutation = usePatchCommentMutation()
  const deleteCommentMutation = useDeleteCommentMutation();

  

  const handleLikeComment = async (id: number, postId: number) => {
    try {

      // 로컬에서 먼저 좋아요 증가
      likeComment(postId, id)
      
      // 서버에 요청 보내기
      await patchCommentMutation.mutateAsync({ comments, id, postId })
      
      // 주의: 여기서 서버 응답의 data.id가 아닌 원래 id를 사용함
      // likeComment(postId, data.id) 이 부분이 문제였음
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
      // 오류 발생 시 롤백 로직 추가 가능
    }
  }

  const handleDeleteComment = async (id: number, postId: number) => {
    try {
      await deleteCommentMutation.mutateAsync(id)
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
