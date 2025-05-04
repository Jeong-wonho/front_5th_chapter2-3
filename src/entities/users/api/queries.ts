import { useQuery } from '@tanstack/react-query'
import { getUser, getUsers } from './users'

export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  detail: (id: number) => [...userKeys.all, 'detail', id] as const,
}

export const useUsersQuery = () => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: getUsers,
  })
}

export const useUserQuery = (userId: number) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUser(userId),
    enabled: !!userId, 
  })
}