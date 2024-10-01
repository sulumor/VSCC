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
    <MessageError v-if="isError" :error="error" />
    <ProgressSpinner v-if="isLoading" />
    <div v-if="trace" class="flex flex-col gap-3">
      <BackButton class="self-end w-auto" />
      <TraceTitle :trace="trace" />
      <EditTrace :trace="trace" />
    </div>
  </main>
</template>

<style></style>
