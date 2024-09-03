<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavBar from './components/navbar/NavBar.vue'
  import LogoImg from './components/logo/LogoImg.vue'
</script>

<template>
  <header>
    <LogoImg />
    <NavBar />
  </header>

  <RouterView />
  <Toast position="bottom-right" />
</template>

<style scoped>
  header {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #343838;
  }
</style>
