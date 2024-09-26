<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavBar from './components/navbar/NavBar.vue'
  import { onMounted } from 'vue'
  import { useTracesStore } from '@/stores/traces'
  import { useUsersStore } from './stores/users'

  const traceStore = useTracesStore()
  const userStore = useUsersStore()

  onMounted(() => {
    traceStore.initAllTraces()
    userStore.loadUserFromToken()
  })
</script>

<template>
  <NavBar />
  <RouterView />
  <Toast position="top-center" />
</template>

<style></style>
