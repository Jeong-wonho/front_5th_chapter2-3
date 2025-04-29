export interface Comment {
  id: number
  body: string | null
  postId: number | null
  userId: number | null
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
