<script setup lang="ts">
  import ProfileCardInner from '@/ui/src/pages/index/components/profile-card/profile-card-inner.vue'
  import { ACCOUNT_TYPE } from '@/ui/src/lib/spotify-oauth'
  import { useUserProfile } from '@/ui/src/queries/profile'

  const properties = defineProps<{
    accountType: ACCOUNT_TYPE
  }>()

  const { isSuccess, data } = useUserProfile(properties.accountType)
</script>

<template>
  <profile-card-inner
    v-if="isSuccess"
    :profile="data"
    :account-type="accountType"
  />
</template>
