import ky from 'ky'
import { KyInstance } from 'ky/distribution/types/ky'
import { Artist, PrivateUser } from 'spotify-types'
import { Opaque } from 'type-fest'

import { ACCOUNT_TYPE } from '@/ui/src/lib/spotify-oauth'
import { useSpotifyStore } from '@/ui/src/stores/spotify-store'

type SpotifyClient = Opaque<KyInstance>
export function createClient(token: string): SpotifyClient {
  const spotifyStore = useSpotifyStore()
  return ky.create({
    prefixUrl: 'https://api.spotify.com/v1',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    hooks: {
      afterResponse: [
        async (request, options, response) => {
          if (response.status === 401) {
            spotifyStore.sourceAccessToken = null
            spotifyStore.targetAccessToken = null
          }

          return response
        },
      ],
    },
  }) as SpotifyClient
}

export function useSpotifyClient(type: ACCOUNT_TYPE): SpotifyClient {
  const store = useSpotifyStore()
  const token =
    type === ACCOUNT_TYPE.SOURCE
      ? store.sourceAccessToken
      : store.targetAccessToken

  if (!token) {
    throw new Error('Cannot initialize the client. Token not available')
  }

  return createClient(token)
}

export async function fetchUserProfile(
  accountType: ACCOUNT_TYPE,
): Promise<PrivateUser> {
  return useSpotifyClient(accountType).get('me').json<PrivateUser>()
}

export async function fetchUserFollowedArtists(
  accountType: ACCOUNT_TYPE,
  { limit = 50, after = null }: { limit?: number; after?: string | null } = {},
) {
  return useSpotifyClient(accountType)
    .get('me/following', {
      searchParams: {
        type: 'artist',
        limit,
        ...(after ? { after } : undefined),
      },
    })
    .json<{
      artists: {
        items: Artist[]
        next: string
        total: number
        cursors: { after: string | null }
      }
    }>()
}

export async function fetchUserFollowedArtistsIterator(
  accountType: ACCOUNT_TYPE,
) {
  return {
    [Symbol.asyncIterator]() {
      let after: string | null = null
      return {
        async next() {
          const value = await fetchUserFollowedArtists(accountType, {
            limit: 50,
            after,
          })
          after = value.artists.cursors.after
          const done = !after
          return { value, done }
        },
      }
    },
  }
}

export async function addUserFollowedArtist(
  artistIds: string[],
  accountType: ACCOUNT_TYPE,
): Promise<void> {
  return useSpotifyClient(accountType)
    .put('me/following?type=artist', { json: { ids: artistIds } })
    .json()
}
