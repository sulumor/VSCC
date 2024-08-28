<script setup lang="ts">
  defineProps<{
    id: string
    hash: string
  }>()
  const stravaScript = document.createElement('script')
  stravaScript.setAttribute('src', 'https://strava-embeds.com/embed.js')
  document.head.appendChild(stravaScript)
</script>

<template>
  <div
    class="strava-embed-placeholder"
    data-embed-type="route"
    :data-embed-id="id"
    data-style="standard"
    :data-map-hash="hash"
    data-from-embed="true"
  ></div>
</template>

<style></style>
