import { useSpotifyStore } from '@/ui/src/stores/spotify-store'

export const enum ACCOUNT_TYPE {
  SOURCE = 'source',
  TARGET = 'target',
}

export function getOAuth2URL(accountType: ACCOUNT_TYPE): string {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const url = new URL('https://accounts.spotify.com/authorize')

  for (const [key, value] of Object.entries({
    response_type: 'token',
    client_id: '4f0e77fae379483e95330818f610ab26',
    scope:
      'user-read-private user-read-email user-follow-read user-follow-modify',
    redirect_uri: 'http://localhost:9000/',
    state: accountType,
    show_dialog: 'true',
  })) {
    url.searchParams.set(key, value)
  }

  return url.toString()
}

export function registerOauthTokenInStore() {
  const hash = window.location.hash.substring(1)
  const query = new URLSearchParams(hash)

  const spotifyStore = useSpotifyStore()
  const state = query.get('state')
  const token = query.get('access_token')

  if (!state || !token) {
    return
  }

  switch (state) {
    case ACCOUNT_TYPE.SOURCE: {
      spotifyStore.sourceAccessToken = token
      break
    }

    case ACCOUNT_TYPE.TARGET: {
      spotifyStore.targetAccessToken = token
      break
    }

    default: {
      throw new Error('Unexpected state value')
    }
  }

  window.location = '/'
}
