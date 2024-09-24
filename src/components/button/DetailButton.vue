<script setup lang="ts">
  defineProps<{
    id: number
  }>()
</script>

<template>
  <Button severity="secondary" label="Voir les détails" as="router-link" :to="'/' + id" />
</template>

<style></style>
