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
  <main class="flex flex-wrap" v-if="currentTrace">
    <Card class="grow">
      <template #title>
        {{ currentTrace?.start }} ->
        {{ currentTrace?.switch ? currentTrace?.switch + ' -> ' : ' ' }} {{ currentTrace?.finish }}
      </template>
      <template #content>
        <p>Description : {{ currentTrace.description }}</p>
      </template>
    </Card>
    <StravaCard :id="currentTrace.strava_id" :hash="currentTrace.strava_hash" />
  </main>
  <main v-else>
    <Message severity="error"> Nous n'avons pas retrouvé votre trace. Veuillez réessayer </Message>
  </main>
</template>

<style></style>
