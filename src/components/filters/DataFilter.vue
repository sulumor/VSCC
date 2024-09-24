<script setup lang="ts">
  import { ref } from 'vue'
  import { useTracesStore } from '@/stores/traces'
  import type { Trace } from '@/@Types/Traces'

  const traceStore = useTracesStore()

  const op = ref()
  const selectedDistances = ref()
  const distanceMessage = ref('Entre 50 et 300 kms')
  const selectedElevations = ref()
  const elevationMessage = ref('Entre 300 et 3500 m D+')

  let traceFilted = defineModel({ required: true })

  const distanceFiltre = ref()
  const elevationFiltre = ref()

  const filterDistances = () => {
    distanceFiltre.value = traceStore.filterTraceByParams('distance', selectedDistances)
    distanceMessage.value = `Entre ${selectedDistances.value[0]} et ${selectedDistances.value[1]} kms`
    if (!elevationFiltre.value) traceFilted.value = distanceFiltre.value
    else
      traceFilted.value = distanceFiltre.value.filter((trace: Trace) =>
        elevationFiltre.value.includes(trace)
      )
  }

  const filterElevations = () => {
    elevationFiltre.value = traceStore.filterTraceByParams('elevation', selectedElevations)
    elevationMessage.value = `Entre ${selectedElevations.value[0]} et ${selectedElevations.value[1]} m D+`
    if (!distanceFiltre.value) traceFilted.value = elevationFiltre.value
    else
      traceFilted.value = elevationFiltre.value.filter((trace: Trace) =>
        distanceFiltre.value.includes(trace)
      )
  }

  const resetFilters = () => {
    traceFilted.value = traceStore.traces
    selectedDistances.value = ''
    distanceMessage.value = `Entre 50 et 300 kms`
    selectedElevations.value = ''
    elevationMessage.value = `Entre 300 et 3500 m D+`
  }

  const toggle = (event: any) => {
    op.value.toggle(event)
  }
</script>

<template>
  <Button type="button" label="Filtres" @click="toggle" />
  <Popover ref="op">
    <div class="flex flex-col gap-4 w-[26rem]">
      <div class="flex justify-evenly items-center">
        <h2>Distance :</h2>

        <Slider
          v-model="selectedDistances"
          range
          :min="50"
          :max="300"
          @change="filterDistances()"
          class="w-1/3"
        />
        <h3>{{ distanceMessage }}</h3>
      </div>
      <div class="flex justify-evenly items-center">
        <h2>Dénivelé :</h2>
        <Slider
          v-model="selectedElevations"
          range
          :min="300"
          :max="3500"
          @change="filterElevations()"
          class="w-1/3"
        />
        <h3>{{ elevationMessage }}</h3>
      </div>
      <Button label="Remise à zéro des filtres" @click="resetFilters" />
    </div>
  </Popover>
</template>

<style></style>
