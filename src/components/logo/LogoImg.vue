<script setup lang="ts">
  import { ref } from 'vue'
  const img = ref<'logo' | 'mobileLogo' | undefined>(
    window.innerWidth > 640 ? 'logo' : 'mobileLogo'
  )
</script>

<template>
  <RouterLink to="/">
    <img :src="`/${img}.png`" alt="Logo du Vélo Sport Clichois Cyclo" />
  </RouterLink>
</template>

<style></style>
