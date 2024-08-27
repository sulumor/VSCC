<template>
  <main>
    <StravaTrace
      v-for="trace in traceStore.traces"
      :key="trace.id"
      :id="trace.stravaId"
      :hash="trace.stravaHash"
    />
  </main>
</template>

<script setup lang="ts">
  import StravaTrace from '@/components/StravaTrace.vue'
  import { useTracesStore } from '@/stores/traces'

  const traceStore = useTracesStore()
</script>
