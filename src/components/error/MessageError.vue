<script setup lang="ts">
  import BackButton from '../button/BackButton.vue'

  defineProps<{
    error: Error | null
  }>()
</script>

<template>
  <div class="w-[50%] mx-auto my-10 flex flex-col gap-5">
    <Message severity="error"> {{ error }} </Message>
    <BackButton />
  </div>
</template>

<style></style>
