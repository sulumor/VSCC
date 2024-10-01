<script setup lang="ts">
  import { computed, ref } from 'vue'
  import type { Trace } from '@/@Types/Traces'
  import { useUsersStore } from '@/stores/users'
  import CloudinaryImage from '../image/CloudinaryImage.vue'
  import { useQuery } from '@tanstack/vue-query'
  import crud from '@/utils/crud'
  import SortFilter from '../filters/SortFilter.vue'
  import DataFilter from '../filters/DataFilter.vue'

  const userStore = useUsersStore()
  let queries: string = ''

  const getTraces = async () => await crud.get(`api/traces${queries}`)
  const { data, isError, error, isPending, isFetching } = useQuery({
    queryKey: ['traces'],
    queryFn: getTraces
  })

  const rows = window.innerWidth > 640 ? 8 : 4
  const layout = ref<'grid' | 'list' | undefined>(window.innerWidth > 640 ? 'grid' : 'list')
  const sortKey = ref()
  const sortOrder = ref()
  const sortField = ref()

  const selectedDistances = ref([50, 300])

  const selectedElevations = ref([300, 3500])

  const filteredData = computed(() => {
    if (!data.value) return []
    return data.value.filter((trace: Trace) => {
      if (
        trace.distance > selectedDistances.value[0] &&
        trace.distance < selectedDistances.value[1] &&
        trace.elevation > selectedElevations.value[0] &&
        trace.elevation < selectedElevations.value[1]
      )
        return trace
    })
  })
</script>

<template>
  <DataView
    :value="filteredData"
    :layout="layout"
    :dataKey="layout"
    :sortOrder="sortOrder"
    :sortField="sortField"
    paginator
    :rows="rows"
  >
    <template #header>
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
    </template>

    <template #empty>
      <div v-if="isPending || isFetching">
        <ProgressSpinner aria-label="Loading" />
      </div>
      <div v-if="isError">
        {{ error!.message }}
      </div>
    </template>
    <template #list="slotProps">
      <div class="flex flex-col">
        <div v-for="(item, index) in slotProps.items" :key="index">
          <div
            class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
            :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }"
          >
            <div class="w-full sm:max-w-96 sm:w-2/3">
              <CloudinaryImage
                :image="item.image.includes('Screen') ? 'hmmiqsh7isuvovoyp62g' : item.image"
              />
            </div>

            <div class="flex flex-col justify-between items-center flex-1 gap-6">
              <div class="text-lg font-medium mt-1 h-14">{{ item.start }} -> {{ item.finish }}</div>

              <span class="text-lg font-semibold"
                >{{ item.distance }} km - {{ item.elevation }} m D+</span
              >

              <DetailButton :id="item.id" />
              <EditButton v-if="userStore.isAuthenticated" :id="item.id" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #grid="slotProps">
      <div v-if="isFetching">
        <ProgressSpinner />
      </div>
      <div v-if="isError">
        {{ error!.message }}
      </div>
      <div v-else class="grid grid-cols-12 gap-4">
        <div
          v-for="(item, index) in slotProps.items"
          :key="index"
          class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-2"
        >
          <div
            class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col"
          >
            <div class="pt-6 flex flex-col justify-center align-middle gap-8">
              <div class="bg-surface-50 flex justify-center rounded h-32">
                <CloudinaryImage
                  :image="
                    item.image.includes('Screen') ? 'hmmiqsh7isuvovoyp62g' : 'q6sbapsjnvevpxwppifj'
                  "
                />
              </div>
              <div class="text-lg font-medium mt-1 h-14">{{ item.start }} -> {{ item.finish }}</div>

              <span class="text-2xl font-semibold"
                >{{ item.distance }} km - {{ item.elevation }} m D+</span
              >

              <DetailButton :id="item.id" />
              <EditButton v-if="userStore.isAuthenticated" :id="item.id" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<style></style>
