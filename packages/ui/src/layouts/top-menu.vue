<template>
  <div class="q-gutter-x-md">
    <router-link
      v-for="(item, index) in menuItems"
      :key="index"
      :to="item.url"
      active-class="text-bold"
    >
      {{ item.title }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
  const menuItems = [
    {
      title: 'Manage playlists',
      url: '/',
    },
    {
      title: 'Manage artists ',
      url: '/2',
    },
    {
      title: 'Manage liked songs',
      url: '/3',
    },
  ]
  // const props = defineProps<{}>()
</script>

<style scoped lang="scss"></style>
