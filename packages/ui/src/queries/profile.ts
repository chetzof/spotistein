import { ACCOUNT_TYPE } from '@/ui/src/lib/spotify-oauth'
import { useQuery } from '@tanstack/vue-query'
import {
  fetchUserFollowedArtists,
  fetchUserProfile,
} from '@/ui/src/lib/spotify-client'
import type { PrivateUser } from 'spotify-types'

export interface UserProfile {
  name?: string
  email: PrivateUser['email']
  avatar?: string
  plan: PrivateUser['product']
}

export function useUserProfile(accountType: ACCOUNT_TYPE) {
  return useQuery({
    queryKey: ['profile', accountType],
    select: (data): UserProfile => ({
      avatar: data.images.length > 0 ? data.images[0].url : undefined,
      email: data.email,
      name: data.display_name ?? undefined,
      plan: data.product,
    }),
    queryFn: () => fetchUserProfile(accountType),
  })
}

export function useFollowerList(accountType: ACCOUNT_TYPE) {
  return useQuery({
    queryKey: ['profile', accountType, 'followers'],
    queryFn: () => fetchUserFollowedArtists(accountType),
  })
}
