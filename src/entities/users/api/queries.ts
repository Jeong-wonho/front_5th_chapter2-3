import { useQuery } from '@tanstack/react-query'
import { getUsers } from './users'

export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
}

export const useUsersQuery = () => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: getUsers,
  })
} 