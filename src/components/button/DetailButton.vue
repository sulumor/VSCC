<script setup lang="ts">
  import Button from 'primevue/button'
  defineProps<{
    id: number
  }>()
</script>

<template>
  <Button severity="secondary" label="Détails" as="router-link" :to="'/' + id" />
</template>

<style></style>
