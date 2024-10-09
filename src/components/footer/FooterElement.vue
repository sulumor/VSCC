<script setup lang="ts">
  const year = new Date(Date.now()).getFullYear()
</script>

<template>
  <footer class="bg-[#343838] text-center px-8 pt-8 pb-12 text-white">
    &copy; {{ year }} Tous droits réservés |
    <a href="https://sulumor.github.io" target="_blank">Sulumor</a>
  </footer>
</template>

<style></style>
