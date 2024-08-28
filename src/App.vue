<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import NavBar from './components/navbar/NavBar.vue'
</script>

<template>
  <header>
    <div class="img-container">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <NavBar />
  </header>

  <RouterView />
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

  .img-container {
    width: 50%;
    padding: 0.4rem 2rem;
  }
</style>
