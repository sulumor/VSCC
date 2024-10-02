<script setup lang="ts">
  import crud from '@/utils/crud'
  import { useQuery } from '@tanstack/vue-query'
  import { ref } from 'vue'

  const queries = ref('')

  const getTraces = async () => await crud.get(`api/traces${queries.value}`)
  const {
    data: traces,
    isError,
    error,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ['traces'],
    queryFn: getTraces
  })
</script>

<template>
  <main>
    <MessageError v-if="isError" :error="error" />
    <ProgressSpinner v-if="isLoading || isFetching" aria-label="loading" />
    <DatasDisplay
      v-if="traces && !isError && !isFetching"
      v-model:queries="queries"
      :traces="traces"
    />
  </main>
</template>
