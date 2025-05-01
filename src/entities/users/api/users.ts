import { UserResponse } from "../models";

export const getUsers = async (): Promise<UserResponse> => {
    const response = await fetch("api/users?limit=0&select=id,username,image");
    const data = await response.json();
    return data;
}