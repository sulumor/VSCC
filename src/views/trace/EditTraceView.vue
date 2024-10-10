<script setup lang="ts">
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
    queryKey: ['trace', id.toString()],
    queryFn: getTraceById
  })
</script>

<template>
  <main>
    <BackButton class="self-end w-auto" />
    <h1 class="text-xl font-black text-center">MODIFIER LA TRACE</h1>
    <TraceTitle :trace="trace" />
    <MessageError v-if="isError" :error="error" />
    <ProgressSpinner v-if="isLoading" aria-label="loading" />
    <EditTrace v-if="trace" :trace="trace" />
  </main>
</template>

<style></style>
