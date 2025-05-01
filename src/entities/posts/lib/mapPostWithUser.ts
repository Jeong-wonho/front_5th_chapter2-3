import { User } from "../../users/models";
import { Post } from "../models";

export function mapPostsWithUsers(posts: Post[], users:User[]){
    return posts.map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.userId)
    }))
}