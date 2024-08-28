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

  const findOneById: (id: string) => Trace | undefined = (id) => {
    return traces.value.find((trace) => trace.id === Number.parseInt(id, 10))
  }
  return { traces, findOneById }
})
