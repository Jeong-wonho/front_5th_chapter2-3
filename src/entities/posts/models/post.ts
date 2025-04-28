import { User } from "../../users/models";

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags?: string[];
    reactions?: {
      likes: number;
      dislikes: number;
    };
    views?: number;
    author?: User;
  }

export interface PostResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}