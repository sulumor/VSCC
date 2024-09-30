<script setup lang="ts">
  import { useTracesStore } from '@/stores/traces'
  import { ref, watchEffect } from 'vue'
  import type { Trace } from '@/@Types/Traces'
  import { useUsersStore } from '@/stores/users'
  import CloudinaryImage from '../image/CloudinaryImage.vue'

  const traceStore = useTracesStore()
  const userStore = useUsersStore()

  const rows = window.innerWidth > 640 ? 8 : 4
  const layout = ref<'grid' | 'list' | undefined>(window.innerWidth > 640 ? 'grid' : 'list')
  const sortKey = ref()
  const sortOrder = ref()
  const sortField = ref()
  const traceFilted = ref()
  const sortDistanceOptions = ref([
    { label: 'Distance croissante', value: 'distance' },
    { label: 'Distance décroissante', value: '!distance' }
  ])
  const sortElevationOptions = ref([
    { label: 'Dénivelé croissant', value: 'elevation' },
    { label: 'Dénivelé décroissant', value: '!elevation' }
  ])
  const onSortChange = (event: any) => {
    const value = event.value.value
    const sortValue = event.value

    if (value.indexOf('!') === 0) {
      sortOrder.value = -1
      sortField.value = value.substring(1, value.length)
      sortKey.value = sortValue
    } else {
      sortOrder.value = 1
      sortField.value = value
      sortKey.value = sortValue
    }
  }
  const starts = ref()
  const finishes = ref()
  const startSelected = ref()
  const finishSelected = ref()

  const filterStart = () => {
    if (startSelected.value.length > 0) {
      traceFilted.value = traceStore.traces.filter((trace: Trace) =>
        startSelected.value.includes(trace.start)
      )
    } else {
      traceFilted.value = traceStore.traces.sort((a: Trace, b: Trace) => {
        return a.id - b.id
      })
    }
  }

  const filterFinish = () => {
    if (finishSelected.value.length > 0) {
      traceFilted.value = traceStore.traces.filter((trace: Trace) =>
        finishSelected.value.includes(trace.finish)
      )
    } else {
      traceFilted.value = traceStore.traces.sort((a: Trace, b: Trace) => {
        return a.id - b.id
      })
    }
  }

  watchEffect(() => {
    if (traceStore.traces) {
      traceFilted.value = traceStore.traces.sort((a: Trace, b: Trace) => {
        return a.id - b.id
      })
      starts.value = [...new Set(traceStore.traces.map((trace: { start: string }) => trace.start))]
      finishes.value = [
        ...new Set(traceStore.traces.map((trace: { finish: string }) => trace.finish))
      ]
    }
  })
</script>

<template>
  <DataView
    :value="traceFilted"
    :layout="layout"
    :dataKey="layout"
    :sortOrder="sortOrder"
    :sortField="sortField"
    paginator
    :rows="rows"
  >
    <template #header>
      <div class="flex gap-4">
        <DataFilter v-model="traceFilted" />
        <MultiSelect
          v-model="startSelected"
          :options="starts"
          placeholder="Ville de départ(s)"
          @change="filterStart"
        />
        <MultiSelect
          v-model="finishSelected"
          :options="finishes"
          placeholder="Ville d'arrivée(s)"
          @change="filterFinish"
        />
        <Select
          v-model="sortKey"
          :options="sortDistanceOptions"
          optionLabel="label"
          placeholder="Trier par distance"
          @change="onSortChange($event)"
        />
        <Select
          v-model="sortKey"
          :options="sortElevationOptions"
          optionLabel="label"
          placeholder="Trier par dénivelé"
          @change="onSortChange($event)"
        />
      </div>
    </template>

    <template #empty>
      <div v-if="traceStore.loading">
        <div v-if="layout === 'grid'" class="grid grid-cols-12 gap-4">
          <div v-for="i in 9" :key="i" class="col-span-12 sm:col-span-6 xl:col-span-3 p-2">
            <div
              class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded"
            >
              <div class="flex flex-wrap items-center justify-between gap-2">
                <Skeleton width="6rem" height="2rem" />
                <Skeleton width="3rem" height="1rem" />
              </div>
              <div class="flex flex-col items-center gap-4 py-8">
                <Skeleton width="75%" height="10rem" />
                <Skeleton width="8rem" height="2rem" />
                <Skeleton width="6rem" height="1rem" />
              </div>
              <div class="flex items-center justify-between">
                <Skeleton width="4rem" height="2rem" />
                <Skeleton width="6rem" height="1rem" shape="circle" size="3rem" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col">
          <div v-for="i in 6" :key="i">
            <div
              class="flex flex-col xl:flex-row xl:items-start p-6 gap-6"
              :class="{ 'border-t border-surface-200 dark:border-surface-700': i !== 0 }"
            >
              <Skeleton class="!w-9/12 sm:!w-64 xl:!w-40 !h-24 mx-auto" />
              <div
                class="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6"
              >
                <div class="flex flex-col items-center sm:items-start gap-4">
                  <Skeleton width="8rem" height="2rem" />
                  <Skeleton width="6rem" height="1rem" />

                  <div class="flex items-center gap-4">
                    <Skeleton width="6rem" height="1rem" />
                    <Skeleton width="3rem" height="1rem" />
                  </div>
                </div>
                <div class="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                  <Skeleton width="4rem" height="2rem" />
                  <Skeleton size="3rem" shape="circle" />
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <div class="grid grid-cols-12 gap-4">
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
