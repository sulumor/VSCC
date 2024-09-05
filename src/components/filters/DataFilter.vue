<script setup lang="ts">
  import { ref } from 'vue'
  import { useTracesStore } from '@/stores/traces'

  const traceStore = useTracesStore()

  const op = ref()
  const selectedDistances = ref()
  const distanceMessage = ref('Entre 50 et 300 kms')
  const selectedElevations = ref()
  const elevationMessage = ref('Entre 300 et 3500 m D+')

  const filterDistances = () => {
    selectedElevations.value = ''
    traceStore.filterDistances(selectedDistances)
    distanceMessage.value = `Entre ${selectedDistances.value[0]} et ${selectedDistances.value[1]} kms`
  }

  const filterElevations = () => {
    selectedDistances.value = ''
    traceStore.filterElevations(selectedElevations)
    elevationMessage.value = `Entre ${selectedElevations.value[0]} et ${selectedElevations.value[1]} m D+`
  }

  const resetFilters = () => {
    traceStore.traceFilted = traceStore.traces
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
