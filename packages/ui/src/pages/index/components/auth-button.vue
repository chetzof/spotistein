<template>
  <q-btn label="Connect" @click="authentificate" />
</template>
<script setup lang="ts">
  import { ACCOUNT_TYPE, getOAuth2URL } from '@/ui/src/lib/spotify-oauth'

  const properties = defineProps<{
    accountType: ACCOUNT_TYPE
  }>()

  const authentificate = () => {
    const spotifyLogoutWindow = window.open(
      'https://accounts.spotify.com/en/logout',
      'Spotify Logout',
      'width=700,height=500,top=40,left=40',
    )
    setTimeout(() => {
      spotifyLogoutWindow?.close()
      window.location.assign(getOAuth2URL(properties.accountType))
    }, 1000)
  }
</script>
