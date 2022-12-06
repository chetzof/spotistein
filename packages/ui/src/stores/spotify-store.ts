import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useSpotifyStore = defineStore('spotify', () => {
  const sourceAccessToken = useLocalStorage<string | null>(
    'source-token',
    null,
    {
      writeDefaults: false,
    }
  )
  const targetAccessToken = useLocalStorage<string | null>(
    'target-token',
    null,
    {
      writeDefaults: false,
    }
  )

  return { sourceAccessToken, targetAccessToken }
})
