<script setup lang="ts">
  defineProps<{
    error: Error | null
  }>()
</script>

<template>
  <div class="w-[50%] mx-auto my-10">
    <Message severity="error"> {{ error }} </Message>
  </div>
</template>

<style></style>
