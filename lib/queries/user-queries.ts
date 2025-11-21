import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"

// Query keys
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  current: () => [...userKeys.all, "current"] as const,
}

// Fetch current user
export function useCurrentUser() {
  const supabase = createClient()

  return useQuery({
    queryKey: userKeys.current(),
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error
      return data.user
    },
  })
}

// Update user profile
export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (updates: { first_name?: string; last_name?: string }) => {
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.current() })
    },
  })
}

// Example: Fetch user data from custom endpoint
export function useUserData(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) throw new Error("Failed to fetch user data")
      return response.json()
    },
    enabled: !!userId,
  })
}
