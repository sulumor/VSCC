<script setup lang="ts">
  import type { Nullable } from '@/@Types/Nullable'

  const model = defineModel<Nullable<string | undefined>>({ required: true })
  defineProps<{
    id: string
    label: string
    errors?: string
    aria: string
  }>()
</script>

<template>
  <div class="flex flex-col">
    <FloatLabel>
      <InputText
        :id
        v-model="model"
        :aria-description="aria"
        :class="{ 'p-invalid': errors }"
        class="w-full"
      />
      <label :for="id">{{ label }}</label>
    </FloatLabel>
    <Message v-if="errors" :id="aria" class="p-error" severity="error">{{ errors }}</Message>
  </div>
</template>

<style>
  .p-error {
    display: block;
  }
</style>
