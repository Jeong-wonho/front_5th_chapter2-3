import { User } from "../../users/models"

export interface Comment {
  id: number
  body: string
  postId: number | null
  user: User
  likes: number
}

export const getIncreasedLikes = (
  commentsByPost: { [postId: number]: Comment[] },
  postId: number,
  commentId: number,
): number => {
  const commentArr = commentsByPost[postId] || []
  const comment = commentArr.find((c) => c.id === commentId)
  return comment ? comment.likes + 1 : 1 // 없으면 1로 시작
}
