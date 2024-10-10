<script setup lang="ts">
  const props = defineProps<{
    error: Error | null
  }>()

  const message = props.error?.message.includes('jwt')
    ? "Une erreur s'est produite, veuillez vous connecter de nouveau"
    : props.error?.message
</script>

<template>
  <div class="w-[50%] mx-auto my-10">
    <Message severity="error"> {{ message }} </Message>
  </div>
</template>

<style></style>
