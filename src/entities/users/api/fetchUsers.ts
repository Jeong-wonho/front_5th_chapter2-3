import { UserResponse } from "../models";

export async function getUsers(): Promise<UserResponse> {
    const response = await fetch("/api/users?limit=0&select=username,image");
    return response.json();
}