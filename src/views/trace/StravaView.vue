<script setup lang="ts">
  import BackButton from '@/components/button/BackButton.vue'
  import crud from '@/utils/crud'
  import { useQuery } from '@tanstack/vue-query'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const id = route.params.id

  const getTraceById = async () => await crud.get(`api/traces/${id}`)
  const {
    data: trace,
    isError,
    error,
    isLoading
  } = useQuery({
    queryKey: ['traces', id.toString()],
    queryFn: getTraceById,
    staleTime: 30000
  })
</script>

<template>
  <main>
    <MessageError v-if="isError" :error="error" />
    <ProgressSpinner v-if="isLoading" />
    <div v-if="trace" class="flex flex-col gap-4 justify-center items-center">
      <BackButton class="self-end" />
      <Card>
        <template #title>
          <TraceTitle :trace="trace" />
        </template>
        <template #content>
          <div class="flex flex-col gap-4 justify-center items-center">
            <h2 class="text-xl text-center">{{ trace.description }}</h2>
            <TraceInfo :trace="trace" />
            <StravaCard :id="trace.strava_id" :hash="trace.strava_hash" />
          </div>
        </template>
      </Card>
    </div>
  </main>
</template>

<style></style>
