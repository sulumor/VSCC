<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useQueryClient } from '@tanstack/vue-query'
  import type { Traces } from '@/@Types/Traces'

  const queryClient = useQueryClient()
  const op = ref()

  const toggle = (event: any) => {
    op.value.toggle(event)
  }

  const selectedDistances = defineModel<number[]>('selectedDistances', {
    required: true
  })
  const selectedElevations = defineModel<number[]>('selectedElevations', { required: true })
  const queries = defineModel<string>('queries', { required: true })

  const distanceMessage = computed(
    () => `Entre ${selectedDistances.value[0]} et ${selectedDistances.value[1]} kms`
  )
  const elevationMessage = computed(
    () => `Entre ${selectedElevations.value[0]} et ${selectedElevations.value[1]} m D+`
  )

  const starts = ref()
  const finishes = ref()
  const startSelected = ref()
  const finishSelected = ref()

  onMounted(async () => {
    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    let datas: Traces | undefined = queryClient.getQueryData(['traces'])
    while (!datas) {
      await wait(1000)
      datas = queryClient.getQueryData(['traces'])
    }
    starts.value = [...new Set(datas.map((trace: { start: string }) => trace.start))]
    finishes.value = [...new Set(datas.map((trace: { finish: string }) => trace.finish))]
  })

  const filter = () => {
    queries.value = ''
    queryClient.invalidateQueries({ queryKey: ['traces'] })
    startSelected.value?.forEach((city: string) => {
      if (queries.value === '') queries.value += `?start=${city}`
      else queries.value += `&start=${city}`
    })
    finishSelected.value?.forEach((city: string) => {
      if (queries.value === '') queries.value += `?finish=${city}`
      else queries.value += `&finish=${city}`
    })
  }
  const restartFilter = () => {
    selectedDistances.value = [50, 300]
    selectedElevations.value = [300, 3500]
    startSelected.value = []
    finishSelected.value = []
    queries.value = ''
    queryClient.invalidateQueries({ queryKey: ['traces'] })
  }
</script>

<template>
  <Button type="button" label="Filtres" @click="toggle" class="mx-2" />
  <Popover ref="op">
    <div class="flex flex-wrap gap-4">
      <div class="flex flex-col justify-center items-center min-w-52">
        <h2>Distance :</h2>
        <Slider v-model="selectedDistances" range :min="50" :max="300" class="w-2/3" />
        <h3>{{ distanceMessage }}</h3>
      </div>
      <div class="flex flex-col justify-center items-center min-w-52">
        <h2>Dénivelé :</h2>
        <Slider v-model="selectedElevations" range :min="300" :max="3500" class="w-2/3" />
        <h3>{{ elevationMessage }}</h3>
      </div>
      <MultiSelect
        v-model="startSelected"
        :options="starts"
        placeholder="Ville de départ(s)"
        display="chip"
        filter
        @change="filter"
      />
      <MultiSelect
        v-model="finishSelected"
        :options="finishes"
        placeholder="Ville d'arrivée(s)"
        display="chip"
        filter
        @change="filter"
      />
      <Button @click="restartFilter">Remise à 0</Button>
    </div>
  </Popover>
</template>

<style></style>
