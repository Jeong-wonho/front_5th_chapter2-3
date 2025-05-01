import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { useCommentStore } from "../../../entities/comments/models/store"
import { usePostStore } from "../../../entities/posts/models"
import { addCommentData } from "../../../entities/comments/api"
import { CreateCommentDialog } from "../../comment-popup/ui/CreateCommentDialog"
import { useState } from "react"

export const AddCommentButton = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const { newComment, setNewComment, addComment } = useCommentStore()
  const selectedPost = usePostStore(state => state.selectedPost)

  const handleAddComment = async () => {
    try {
      const data = await addCommentData(newComment)
      addComment(data.postId, data)
      setShowAddCommentDialog(false)
      setNewComment(null)
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  const handleClick = () => {
    if (selectedPost) {
      setNewComment(selectedPost.id)
      setShowAddCommentDialog(true)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={handleClick}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <CreateCommentDialog
        showAddCommentDialog={showAddCommentDialog}
        setShowAddCommentDialog={setShowAddCommentDialog}
        newComment={newComment}
        setNewComment={setNewComment}
        addComment={handleAddComment}
      />
    </>
  )
}
