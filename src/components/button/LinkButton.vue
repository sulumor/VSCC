<script setup lang="ts">
  defineProps<{
    to: string
    label: string
    severity?: 'success' | 'severity'
  }>()
</script>

<template>
  <Button :severity="severity ?? 'success'" :label="label" as="router-link" :to="to" />
</template>

<style></style>
