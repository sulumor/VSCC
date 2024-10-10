<script setup lang="ts">
  const model = defineModel<string>()
</script>

<template>
  <TextInput id="search" label="Recherche par titre" v-model="model" aria="search-help" />
</template>

<style></style>
