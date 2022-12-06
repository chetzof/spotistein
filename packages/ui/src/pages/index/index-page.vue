<template>
  <q-page class="containe">
    <div class="primary-section">
      <div class="container">
        <div class="row justify-center items-center">
          <div class="col-8">
            <h2>
              <span class="keyword">Manage</span>,
              <span class="keyword">migrate</span> and
              <span class="keyword">backup</span><br />
              <span class="text-h3">your Spotify account</span>
            </h2>
            <h5>Open source, free and totally useless</h5>
            <q-btn size="xl" label="Log in" unelevated color="green" />
          </div>
          <q-img class="col-4" src="../../assets/section-bg.png" />
        </div>
      </div>
    </div>
    <div class="row items-start justify-around full-width">
      <div class="col-6">
        <auth-button
          v-if="!sourceAccessToken"
          :account-type="ACCOUNT_TYPE.SOURCE"
        />
        <profile-card
          v-if="sourceAccessToken"
          :account-type="ACCOUNT_TYPE.SOURCE"
        />
        <artist-list :account-type="ACCOUNT_TYPE.SOURCE" />
        <copy-button />
      </div>
      <div class="col-6">
        <auth-button
          v-if="!targetAccessToken"
          :account-type="ACCOUNT_TYPE.TARGET"
        />
        <profile-card
          v-if="targetAccessToken"
          :account-type="ACCOUNT_TYPE.TARGET"
        />
        <artist-list :account-type="ACCOUNT_TYPE.TARGET" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import ArtistList from '@/ui/src/pages/index/components/artist-list.vue'
  import AuthButton from '@/ui/src/pages/index/components/auth-button.vue'
  import CopyButton from '@/ui/src/pages/index/components/copy-button.vue'
  import ProfileCard from '@/ui/src/pages/index/components/profile-card/profile-card.vue'
  import { storeToRefs } from 'pinia'
  import { ACCOUNT_TYPE } from '@/ui/src/lib/spotify-oauth'
  import { useSpotifyStore } from '@/ui/src/stores/spotify-store'
  let code =
    'export const hello =\n\t(name) => {console.log(`Hello ${name}!`)};'

  const { sourceAccessToken, targetAccessToken } = storeToRefs(
    useSpotifyStore(),
  )
</script>

<style lang="sass">
  .keyword
    font-weight: bold

  .primary-section
    background-color: #fafaac
  //background-repeat: no-repeat
  //background-position: 90%
  //background-size: contain
  //background-image: url("../../assets/section-bg.png")
</style>
