import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Trace, Traces } from '@/@Types/Traces'
import { fakeDatas } from '@/fakeData'

export const useTracesStore = defineStore('traces', () => {
  const traces: Ref<Traces> = ref(fakeDatas)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
  const traceFilted = ref(traces.value)

  const findOneById: (id: string) => Trace | undefined = (id) => {
    return traces.value.find((trace) => trace.id === Number.parseInt(id, 10))
  }

  const filterDistances = (selectedDistances: Ref<any>) => {
    traceFilted.value = traces.value.filter((trace: { distance: number }) => {
      if (
        trace.distance > selectedDistances.value[0] &&
        trace.distance < selectedDistances.value[1]
      )
        return trace
    })
  }

  const filterElevations = (selectedElevations: Ref<any>) => {
    traceFilted.value = traces.value.filter((trace: { elevation: number }) => {
      if (
        trace.elevation > selectedElevations.value[0] &&
        trace.elevation < selectedElevations.value[1]
      )
        return trace
    })
  }

  return {
    traces,
    traceFilted,
    findOneById,
    filterDistances,
    filterElevations
  }
})
