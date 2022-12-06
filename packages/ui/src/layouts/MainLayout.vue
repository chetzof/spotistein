<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      flat
      class=""
      style="
        background-color: rgb(255 255 255 / 80%);
        backdrop-filter: blur(7px);
      "
    >
      <q-toolbar class="text-primary container-np q-py-md">
        <!--        <icon-bar style="width: 200px; height: 200px" />-->
        <!--        <q-icon :name="logo" />-->
        <top-logo style="width: 300px" />
        <q-space />

        <top-menu />

        <!--        <q-btn flat dense round icon="menu" aria-label="Menu" />-->

        <!--        <q-toolbar-title> Quasar App </q-toolbar-title>-->

        <!--        <div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>
    <q-page-container style="overflow-x: hidden">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          appear
          :duration="100"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import TopLogo from '@/ui/src/layouts/top-logo.vue'
  import TopMenu from '@/ui/src/layouts/top-menu.vue'
  import { ref } from 'vue'
</script>
