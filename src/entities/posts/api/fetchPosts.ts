import { PostResponse } from "../models";

export async function getPosts(limit:number, skip:number): Promise<PostResponse> {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
    return response.json();
}