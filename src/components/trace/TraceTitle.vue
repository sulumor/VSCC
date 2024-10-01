<script setup lang="ts">
  import type { Trace } from '@/@Types/Traces'

  defineProps<{ trace: Trace }>()
</script>

<template>
  <h1 class="text-xl font-black text-center">
    {{ trace.start }} -> {{ trace.switch ? trace.switch + ' -> ' : ' ' }} {{ trace.finish }}
  </h1>
</template>

<style></style>
