import { UserResponse } from "../models";

export const getUsers = async (): Promise<UserResponse> => {
    const response = await fetch("/api/users?limit=0&select=id,username,image");
    const data = await response.json();
    return data;
}

export const getUser = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      const userData = await response.json()
      return userData;
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }