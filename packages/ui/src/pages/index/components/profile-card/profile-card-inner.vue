<script setup lang="ts">
  import { ACCOUNT_TYPE } from '@/ui/src/lib/spotify-oauth'
  import { UserProfile } from '@/ui/src/queries/profile'
  import { useSpotifyStore } from '@/ui/src/stores/spotify-store'
  import { computed } from 'vue'

  const properties = defineProps<{
    profile: UserProfile
    accountType: ACCOUNT_TYPE
  }>()

  const avatar = computed(() => {
    return (
      properties.profile.avatar ??
      'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png'
    )
  })

  function logOut() {
    const spotifyStore = useSpotifyStore()
    if (properties.accountType === ACCOUNT_TYPE.SOURCE) {
      spotifyStore.sourceAccessToken = null
    } else {
      spotifyStore.targetAccessToken = null
    }
  }
</script>

<template>
  <q-item v-ripple clickable>
    <q-item-section side>
      <q-avatar rounded size="48px">
        <img :src="avatar" />
        <q-badge floating color="teal">{{ profile.plan }}</q-badge>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ profile.name }}</q-item-label>
      <q-item-label caption>2 new messages</q-item-label>
    </q-item-section>
    <q-item-section side
      ><q-btn color="warning" flat label="Log out" @click="logOut"
    /></q-item-section>
  </q-item>
</template>
