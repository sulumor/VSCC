<script setup lang="ts">
  import type { Trace } from '@/@Types/Traces'
  import EditTrace from '@/components/form/EditTrace.vue'
  import { useTracesStore } from '@/stores/traces'

  import { useRoute } from 'vue-router'

  const route = useRoute()
  const tracesStore = useTracesStore()

  const currentTrace: Trace | undefined = tracesStore.findOneById(route.params.id as string)
</script>

<template>
  <main>
    <h1 class="text-xl font-black text-center">
      EDITER LA TRACE {{ currentTrace?.start }} ->
      {{ currentTrace?.switch ? currentTrace?.switch + ' -> ' : ' ' }} {{ currentTrace?.finish }}
    </h1>
    <div v-if="!currentTrace">Une erreur est survenu. Veuillez réessayer plus tard</div>
    <EditTrace v-else :trace="currentTrace" />
  </main>
</template>

<style></style>
