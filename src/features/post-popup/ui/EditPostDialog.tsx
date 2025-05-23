import { Post } from "../../../entities/posts/models"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"

interface EditPostDialogProps {
    showEditDialog: boolean
    setShowEditDialog: (showEditDialog: boolean) => void
    selectedPost: Post | null;
    setSelectedPost: (post: Post | null) => void;
    updatePost: () => void
}
export const EditPostDialog = (
    {
        showEditDialog,
        setShowEditDialog,
        selectedPost,
        setSelectedPost,
        updatePost,
    }: EditPostDialogProps) => {
    return (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => selectedPost && setSelectedPost({ ...selectedPost, body: e.target.value })}
            />
            <Button onClick={updatePost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
}