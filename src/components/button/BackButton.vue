<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goBack = () => {
    router.back()
  }
</script>

<template>
  <Button severity="warn" @click="goBack" label="Retour" />
</template>

<style></style>
