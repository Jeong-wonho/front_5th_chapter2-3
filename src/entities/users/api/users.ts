import { UserResponse } from "../models";
import { apiFetch } from "../../../shared/lib/api-client";

export const getUsers = async (): Promise<UserResponse> => {
    const response = await apiFetch("api/users?limit=0&select=id,username,image");
    const data = await response.json();
    return data;
}