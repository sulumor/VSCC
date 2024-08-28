<script setup lang="ts">
  defineProps<{
    id: number
  }>()
</script>

<template>
  <Button severity="secondary" label="Détails" as="router-link" :to="'/' + id" />
</template>

<style></style>
