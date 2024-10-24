<script setup lang="ts">
  import type { Trace } from '@/@Types/Traces'

  defineProps<{ trace: Trace }>()
</script>

<template>
  <div class="flex flex-col w-auto gap-2">
    <div class="flex items-center gap-1">
      <i class="pi pi-map" style="font-size: 1.5rem"></i>
      {{ trace.distance }}km
    </div>
    <div class="flex items-center gap-1">
      <i class="pi pi-sort-up" style="font-size: 1.5rem"></i>
      {{ trace.elevation }}m
    </div>
    <div v-if="trace.is_a_loop" class="flex items-center gap-1">
      <i class="pi pi-replay" style="font-size: 1.5rem"></i>
      Boucle
    </div>
    <div v-else class="flex items-center gap-1">
      <i class="pi pi-arrow-right" style="font-size: 1.5rem"></i>
      En ligne
    </div>
  </div>
</template>

<style></style>
