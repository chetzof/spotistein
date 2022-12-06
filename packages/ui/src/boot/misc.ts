import { persistQueryClient } from '@tanstack/query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query'
import { boot } from 'quasar/wrappers'

import { registerOauthTokenInStore } from '@/ui/src/lib/spotify-oauth'

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
    clientPersisterr: (queryClient) =>
      persistQueryClient({
        queryClient,
        persister: createSyncStoragePersister({ storage: localStorage }),
      }),
  }
  app.use(VueQueryPlugin, options)
  registerOauthTokenInStore()
})
