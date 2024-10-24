<script setup lang="ts">
  import BackButton from '@/components/button/BackButton.vue'
  import crud from '@/utils/crud'
  import { useQuery } from '@tanstack/vue-query'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const id = Number.parseInt(route.params.id as string, 10)

  const getTraceById = async () => await crud.get(`api/traces/${id}`)
  const {
    data: trace,
    isError,
    error,
    isLoading
  } = useQuery({
    queryKey: ['trace', id.toString()],
    queryFn: getTraceById
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
          <p class="text-xl text-center">{{ trace.title }}</p>
        </template>
        <template #content>
          <div class="flex flex-col gap-4 justify-center items-center">
            <h2 class="text-xl text-center">{{ trace.description }}</h2>
            <TraceInfo :trace="trace" />
            <TraceTitle :trace="trace" />
            <StravaCard :id="trace.strava_id" :hash="trace.strava_hash" />
          </div>
        </template>
      </Card>
    </div>
  </main>
</template>

<style></style>
