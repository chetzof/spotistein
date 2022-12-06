<template>
  <q-table
    ref="tableRef"
    class="my-sticky-dynamic"
    virtual-scroll
    v-model:selected="selected"
    :virtual-scroll-item-size="62"
    v-model:pagination="pagination"
    :virtual-scroll-sticky-size-start="62"
    :loading="isLoading && isFetching"
    :rows="rows"
    flat
    bordered
    separator="none"
    :columns="columns"
    row-key="artist"
    selection="single"
    @virtual-scroll="onScroll"
  >
    <template #body-cell-avatar="props">
      <q-td auto-width :props="props">
        <q-avatar size="48">
          <img :src="props.value" />
        </q-avatar>
      </q-td>
    </template>
    <template #bottom="scope">
      <div class="text-right" style="display: block">
        1-{{ rows.length }} of {{ scope.pagination.rowsNumber }}
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts">
  import { useSpotifyStore } from '@/ui/src/stores/spotify-store'
  import { useInfiniteQuery } from '@tanstack/vue-query'
  import { QTableProps } from 'quasar'
  import { fetchUserFollowedArtists } from '@/ui/src/lib/spotify-client'
  import { ACCOUNT_TYPE } from '@/ui/src/lib/spotify-oauth'
  import { ref } from 'vue'

  const properties = defineProps<{
    accountType: ACCOUNT_TYPE
  }>()
  const columns = [
    {
      name: 'avatar',
      field: 'avatar',
      required: true,
    },
    {
      name: 'artist',
      field: 'artist',
      required: true,
      label: 'Artist',
      align: 'left',
    },
  ]

  const rows = ref([])

  const pagination = ref({
    rowsPerPage: 0,
    rowsNumber: 0,
  })
  const selected = ref([])

  const { isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['profile', properties.accountType, 'followers'],

      queryFn: ({ pageParam }) =>
        fetchUserFollowedArtists(properties.accountType, { after: pageParam }),
      getNextPageParam(lastPage) {
        return lastPage.artists.cursors.after ?? undefined
      },
      onSuccess(data) {
        const out = []

        for (const page of data.pages) {
          for (const item of page.artists.items) {
            out.push({ artist: item.name, avatar: item.images[0].url })
          }
        }

        pagination.value.rowsNumber = data.pages[0].artists.total
        rows.value = out
      },
      enabled:
        properties.accountType === ACCOUNT_TYPE.SOURCE
          ? !!useSpotifyStore().sourceAccessToken
          : !!useSpotifyStore().targetAccessToken,
    })

  async function onScroll(
    details: Parameters<NonNullable<QTableProps['onVirtualScroll']>>[0],
  ) {
    if (
      details.to === rows.value.length - 1 &&
      hasNextPage &&
      hasNextPage.value
    ) {
      await fetchNextPage()
    }
  }
</script>

<style lang="sass">
  .my-sticky-dynamic
    /* height or max-height is important */
    height: 410px

    .q-table__bottom
      justify-content: right
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th /* bg color is important for th; just specify one */
      background-color: #000

    thead tr th
      position: sticky
      z-index: 1
    /* this will be the loading indicator */
    thead tr:last-child th
      /* height of all previous header rows */
      top: 48px
    thead tr:first-child th
      top: 0
</style>
