<template>
  <q-table
    ref="tableRef"
    v-model:selected="selected"
    class="my-sticky-dynamic"
    v-model:pagination="pagination"
    virtual-scroll
    :virtual-scroll-item-size="48"
    :virtual-scroll-sticky-size-start="48"
    :loading="loading"
    title="Treats"
    :rows="rows"
    :columns="columns"
    row-key="name"
    selection="single"
    @virtual-scroll="onScroll"
  />
</template>
<script setup lang="ts">
  import { useInfiniteQuery, useQueryClient } from '@tanstack/vue-query'
  import { QTableProps } from 'quasar'
  import { fetchUserFollowedArtists } from '@/ui/src/lib/spotify-client'
  import { ACCOUNT_TYPE } from '@/ui/src/lib/spotify-oauth'
  import { computed, onMounted, ref } from 'vue'
  const properties = defineProps<{
    accountType: ACCOUNT_TYPE
  }>()
  const columns = [
    {
      name: 'name',
      field: 'name',
      required: true,
      label: 'Dessert (100g serving)',
      align: 'left',
    },
  ]

  const rows = ref([])

  const pagination = ref({
    // sortBy: 'desc',
    // descending: false,
    // page: 1,
    rowsPerPage: 0,
    // rowsNumber: 10,
  })
  const loading = ref(false)
  const selected = ref([])
  const tableReference = ref()
  const queryClient = useQueryClient()

  // const rowsPerPage = computed(() => pagination.value.rowsPerPage)
  onMounted(() => {
    // tableRef.value.requestServerInteraction()
  })

  const response = useInfiniteQuery({
    queryKey: ['profile', properties.accountType, 'followers'],

    queryFn: ({ pageParam }) =>
      fetchUserFollowedArtists(properties.accountType, { after: pageParam }),
    getNextPageParam(lastPage) {
      return lastPage.artists.cursors.after
    },
    onSuccess(data) {
      const out = []

      for (const page of data.pages) {
        for (const item of page.artists.items) {
          out.push(item.name)
        }
      }

      rows.value = out
    },
  })
  // console.log(response)
  // const rows = computed(() =>
  //   response.data.value.pages.artists.items.map((artist) => ({
  //     name: artist.name,
  //   }))
  // )

  async function onScroll(
    details: Parameters<NonNullable<QTableProps['onVirtualScroll']>>[0],
  ) {
    // if (details.to === rows.value.e)
    // await response.fetchNextPage()
    console.log(details)
    // const lastIndex = rows.value.length - 1
    //
    // if (loading.value !== true && nextPage.value < lastPage && to === lastIndex) {
    //   loading.value = true
    //
    //   setTimeout(() => {
    //     nextPage.value++
    //     nextTick(() => {
    //       ref.refresh()
    //       loading.value = false
    //     })
    //   }, 500)
    // }
  }

  async function onRequest(
    requestOptions: Parameters<NonNullable<QTableProps['onRequest']>>[0],
  ) {
    const { page, rowsPerPage, sortBy, descending } = requestOptions.pagination

    loading.value = true

    // emulate server
    // update rowsCount with appropriate value
    // pagination.value.rowsNumber = getRowsNumberCount(filter)

    // get all rows if "All" (0) is selected
    const fetchCount =
      rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

    // calculate starting row of data
    const startRow = (page - 1) * rowsPerPage

    // fetch data from "server"
    // const returnedData = fetchFromServer(
    //   startRow,
    //   fetchCount,
    //   filter,
    //   sortBy,
    //   descending
    // )

    const response = await queryClient.fetchQuery({
      queryKey: [
        'profile',
        properties.accountType,
        'followers',
        requestOptions,
      ],
      queryFn: () =>
        fetchUserFollowedArtists(properties.accountType, {
          limit: requestOptions.pagination.rowsPerPage,
        }),
    })
    rows.value = response.artists.items.map((artist) => ({
      name: artist.name,
    }))
    // clear out existing data and add new
    // rows.value.splice(0, rows.value.length, ...returnedData)

    // don't forget to update local pagination object
    // pagination.value.page = page
    pagination.value.rowsNumber = response.artists.total
    pagination.value.rowsPerPage = rowsPerPage
    // pagination.value.sortBy = sortBy
    // pagination.value.descending = descending

    // ...and turn of loading indicator
    loading.value = false
  }
</script>

<style lang="sass">
  .my-sticky-dynamic
    /* height or max-height is important */
    height: 410px

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th /* bg color is important for th; just specify one */
      background-color: #fff

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
