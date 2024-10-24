<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { Trace, Traces } from '@/@Types/Traces'
  import { useUsersStore } from '@/stores/users'
  import CloudinaryImage from '../image/CloudinaryImage.vue'
  import SortFilter from '../filters/SortFilter.vue'
  import DataFilter from '../filters/DataFilter.vue'
  import TraceInfo from '../trace/TraceInfo.vue'

  const userStore = useUsersStore()
  const queries = defineModel<string>('queries', { required: true })
  const props = defineProps<{
    traces: Traces
  }>()

  const rows = window.innerWidth > 640 ? 8 : 4
  const layout = ref<'grid' | 'list' | undefined>(window.innerWidth > 640 ? 'grid' : 'list')
  const sortKey = ref()
  const sortOrder = ref()
  const sortField = ref()

  const selectedDistances = ref([0, 300])

  const selectedElevations = ref([0, 3500])
  const search = ref('')

  const filteredData = computed(() => {
    if (!props.traces) return []
    return props.traces.filter((trace: Trace) => {
      if (
        trace.distance > selectedDistances.value[0] &&
        trace.distance < selectedDistances.value[1] &&
        trace.elevation > selectedElevations.value[0] &&
        trace.elevation < selectedElevations.value[1] &&
        trace.title.toLowerCase().includes(search.value.toLowerCase())
      )
        return trace
    })
  })
</script>

<template>
  <DataView
    :value="filteredData"
    :dataKey="layout"
    :sortOrder="sortOrder"
    :sortField="sortField"
    layout="grid"
    paginator
    :rows="rows"
  >
    <template #header>
      <div class="flex flex-wrap gap-2">
        <DataFilter
          v-model:selectedDistances="selectedDistances"
          v-model:selectedElevations="selectedElevations"
          v-model:queries="queries"
        />
        <SortFilter
          v-model:sortKey="sortKey"
          v-model:sortOrder="sortOrder"
          v-model:sortField="sortField"
        />
        <SearchFilter v-model="search" />
        <p class="text-base self-center">{{ filteredData.length }} traces disponibles</p>
      </div>
    </template>

    <template #empty> </template>

    <template #grid="slotProps">
      <div class="grid grid-cols-12">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-2"
        >
          <div
            class="p-6 border border-surface-200 bg-surface-0 rounded flex flex-col h-full justify-end"
          >
            <div class="flex flex-col justify-center gap-8">
              <p class="text-xl text-center">{{ item.title }}</p>
              <div class="bg-surface-50 flex justify-center rounded h-32">
                <CloudinaryImage :image="item.image" />
              </div>
              <TraceInfo :trace="item" class="self-center" />

              <LinkButton :to="`/${item.id}`" label="Voir les détails" severity="secondary" />
              <LinkButton
                v-if="userStore.isAuthenticated"
                :to="`/edit-trace/${item.id}`"
                label="Éditer cette trace"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<style></style>
