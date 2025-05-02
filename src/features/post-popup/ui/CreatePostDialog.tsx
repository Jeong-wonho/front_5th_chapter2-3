import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { Post, usePostStore } from "../../../entities/posts/models"
import { useState } from "react"
import { useAddPostMutation } from "../../../entities/posts/api/queries"

interface CreatePostDialogProps {
  showAddDialog: boolean
  setShowAddDialog: (showAddDialog: boolean) => void
}

export const CreatePostDialog = ({ showAddDialog, setShowAddDialog }: CreatePostDialogProps) => {
  const { addPost } = usePostStore();
  const [newPost, setNewPost] = useState<Post>({
    id: 1,
    title: "",
    body: "",
    userId: 1,
  })

  const addPostMutation = useAddPostMutation()

  const handleSubmit = async () => {
    try {
      const createdPost = await addPostMutation.mutateAsync(newPost);
      
      addPost(createdPost);
      setShowAddDialog(false)
      setNewPost((prev) => ({ ...prev, id: prev.id + 1, title: "", body: "", userId: 1 }))
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleSubmit}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
