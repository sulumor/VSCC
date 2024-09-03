<script setup lang="ts">
  import type { Nullable } from '@/@Types/Nullable'

  const model = defineModel<Nullable<string>>({ required: true })
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
      <Textarea
        :id
        v-model="model"
        cols="50"
        :aria-describedby="aria"
        :class="{ 'p-invalid': errors }"
      />
      <label :for="id">{{ label }}</label>
    </FloatLabel>
    <Message v-if="errors" :id="aria" class="p-error" severity="error">{{ errors }}</Message>
  </div>
</template>

<style></style>
