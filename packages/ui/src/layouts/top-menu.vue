<template>
  <div class="q-gutter-x-md">
    <router-link
      :to="item.url"
      active-class="text-bold"
      :key="index"
      v-for="(item, index) in menuItems"
    >
      {{ item.title }}
    </router-link>
  </div>
</template>

<style scoped lang="scss"></style>

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
