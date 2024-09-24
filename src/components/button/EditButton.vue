<script setup lang="ts">
  defineProps<{
    id: number
  }>()
</script>

<template>
  <Button
    severity="success"
    label="Éditer cette trace"
    as="router-link"
    :to="'/edit-trace/' + id"
  />
</template>

<style></style>
