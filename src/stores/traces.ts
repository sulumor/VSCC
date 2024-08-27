import { reactive, type Reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Traces } from '@/@Types/Traces'
import { fakeDatas } from '@/fakeData'

export const useTracesStore = defineStore('traces', () => {
  const traces: Reactive<Traces> = reactive(fakeDatas)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  return { traces }
})
