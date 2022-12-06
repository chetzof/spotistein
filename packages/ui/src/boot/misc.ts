import { boot } from 'quasar/wrappers'
import { registerOauthTokenInStore } from '@/ui/src/lib/spotify-oauth'
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'
import { persistQueryClient } from '@tanstack/query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
export default boot(({ app }) => {
  const options: VueQueryPluginOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          // refetchOnWindowFocus: false,
          // refetchOnMount: false,
          // retry: false,
          // cacheTime: 1000 * 60 * 60 * 24,
          // staleTime: 1000 * 60 * 60 * 24,
        },
      },
    },
    clientPersisterr: (queryClient) => {
      return persistQueryClient({
        queryClient,
        persister: createSyncStoragePersister({ storage: localStorage }),
      })
    },
  }
  app.use(VueQueryPlugin, options)
  registerOauthTokenInStore()
})
