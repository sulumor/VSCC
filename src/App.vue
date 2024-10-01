<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavBar from './components/navbar/NavBar.vue'
  import { onMounted } from 'vue'
  import { useUsersStore } from './stores/users'

  const userStore = useUsersStore()

  onMounted(() => {
    userStore.loadUserFromToken()
  })
</script>

<template>
  <NavBar />
  <RouterView />
  <Toast position="top-center" />
</template>

<style></style>
