import { User } from "../../users/models"

export interface Comment {
  id: number
  body: string
  postId: number | null
  userId: number
  user: User
  likes: number
}
// 댓글 찾기 함수
export const findCommentById = (comments: { [postId: number]: Comment[] }, postId: number, commentId: number): Comment | undefined => {
  return comments[postId]?.find((comment) => comment.id === commentId);
};

// 좋아요 수 증가 함수
export const getIncreasedLikes = (comment: Comment): number => {
  return comment.likes + 1;
};
