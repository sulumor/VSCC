<script setup lang="ts">
  import type { Nullable } from '@/@Types/Nullable'

  const model = defineModel<Nullable<number>>({ required: true })
  defineProps<{
    id: string
    suffix: string
    label: string
    aria: string
    errors?: string
    step?: number
  }>()
</script>

<template>
  <div class="flex flex-col">
    <FloatLabel>
      <InputNumber
        :inputId="id"
        :class="{ 'p-invalid': errors }"
        :invalid="!!errors"
        v-model="model"
        :suffix
        :aria-describedby="aria"
        :min="0"
        :step="step"
        fluid
        showButtons
      />
      <label :for="id">{{ label }}</label>
    </FloatLabel>
    <Message v-if="errors" :id="aria" class="p-error" severity="error">{{ errors }}</Message>
  </div>
</template>

<style></style>
