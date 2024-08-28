<script setup lang="ts">
  import type { Trace } from '@/@Types/Traces'
  import StravaCard from '@/components/card/StravaCard.vue'
  import { useTracesStore } from '@/stores/traces'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const tracesStore = useTracesStore()

  const currentTrace: Trace | undefined = tracesStore.findOneById(route.params.id as string)
</script>

<template>
  <main>
    <StravaCard v-if="currentTrace" :id="currentTrace.stravaId" :hash="currentTrace.stravaHash" />
    <div v-else>Nous n'avons pas retrouvé votre trace. Veuillez réessayer</div>
  </main>
</template>

<style></style>
