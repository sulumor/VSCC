<script setup lang="ts">
  import type { Nullable } from '@/@Types/Nullable'

  const model = defineModel<Nullable<boolean>>({ required: true })
  defineProps<{
    id: string
    label: string
  }>()
</script>

<template>
  <div class="self-center">
    <Checkbox :inputId="id" v-model="model" binary />
    <label :for="id" class="mx-2">{{ label }}</label>
  </div>
</template>

<style></style>
