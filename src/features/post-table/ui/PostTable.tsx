import { Post, usePostFiltersStore } from "../../../entities/posts/models"
import { User } from "../../../entities/users/models"
import { highlightText } from "../../../shared/lib"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { usePostStore } from "../../../entities/posts/models"
import { useCommentStore } from "../../../entities/comments/models"
import { EditPostDialog, PostDetailDialog } from "../../post-popup/ui"
import { useEffect, useState } from "react"
import { UserDetailDialog } from "../../user-popup/ui"
import { useNavigate } from "react-router-dom"
import { useDeletePostMutation, useUpdatePostMutation } from "../../../entities/posts/api/queries"
import { useCommentsQuery } from "../../../entities/comments/api/queries"
import { useUserQuery } from "../../../entities/users/api/queries"

const PostTable = () => {
  const navigate = useNavigate();
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const { searchQuery, selectedTag, setSelectedTag, updateURL } = usePostFiltersStore()
  const { posts, setPosts, selectedPost, setSelectedPost, deletePost } = usePostStore()
  const { setComments } = useCommentStore()
  
  const { data: commentsData } = useCommentsQuery(selectedPost?.id || 0);
  const { data: userData } = useUserQuery(user?.id || 0);
  
  const deletePostMutation = useDeletePostMutation();
  const updatePostMutation = useUpdatePostMutation();

  useEffect(() => {
    if (commentsData && selectedPost?.id) {
      setComments(selectedPost?.id, commentsData.comments);
    }
  },[commentsData, selectedPost?.id, setComments]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePostMutation.mutateAsync(postId);
      deletePost(postId)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  const updatePost = async () => {
    try {
      if (!selectedPost) return
      const data = await updatePostMutation.mutateAsync(selectedPost)
      
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post);
    setShowPostDetailDialog(true)
  }

  const openUserModal = async (user: User) => {
    try {
      setUser(user)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return (
    
    <>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL(navigate)
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => post.author && openUserModal(post.author)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => {
                  setSelectedPost(post)
                  openPostDetail(post)
                }}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <PostDetailDialog
        showPostDetailDialog={showPostDetailDialog}
        setShowPostDetailDialog={setShowPostDetailDialog}
      />
      {/* 게시물 수정 대화상자 */}
      <EditPostDialog
        showEditDialog={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        updatePost={updatePost}
      />
      <UserDetailDialog showUserModal={showUserModal} setShowUserModal={setShowUserModal} selectedUser={user} />
    </>
  )
}

export default PostTable
