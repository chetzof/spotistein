<script setup lang="ts">
  import {
    addUserFollowedArtist,
    fetchUserFollowedArtistsIterator,
  } from '@/ui/src/lib/spotify-client'
  import { ACCOUNT_TYPE } from '@/ui/src/lib/spotify-oauth'

  const copy = async () => {
    for await (const response of await fetchUserFollowedArtistsIterator(
      ACCOUNT_TYPE.SOURCE,
    )) {
      const ids = response.artists.items.map(({ id }) => id)
      await addUserFollowedArtist(ids, ACCOUNT_TYPE.TARGET)
    }
  }
</script>

<template>
  <q-btn label="Copy" @click="copy" />
</template>
