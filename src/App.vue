<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavBar from './components/navbar/NavBar.vue'
  import { onMounted } from 'vue'
  import { useTracesStore } from '@/stores/traces'

  const traceStore = useTracesStore()

  onMounted(() => {
    traceStore.initAllTraces()
  })
</script>

<template>
  <NavBar />
  <RouterView />
  <Toast position="bottom-right" />
</template>

<style></style>
