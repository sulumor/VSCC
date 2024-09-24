import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Trace, Traces } from '@/@Types/Traces'
import crud from '@/utils/crud'
import type { AxiosResponse } from 'axios'
import { useToast } from 'primevue/usetoast'

interface Response {
  data: AxiosResponse<any>['data']
  status?: AxiosResponse<any>['status']
}

export const useTracesStore = defineStore('traces', () => {
  const toast = useToast()
  const traces = ref()
  const loading = ref(false)

  const findOneById: (id: string) => Trace | undefined = (id) => {
    if (!traces.value) initAllTraces()
    return traces.value?.find((trace: Trace) => trace.id === Number.parseInt(id, 10))
  }

  const filterTraceByParams = (params: string, filter: Ref<any>) => {
    if (!traces.value) initAllTraces()
    return traces.value.filter((trace: Trace) => {
      if (trace[params]! > filter.value[0] && trace[params]! < filter.value[1]) return trace
    })
  }

  const initAllTraces = async () => {
    loading.value = true
    const response: Response = await crud.get('api/traces')
    if (response.status === 200) traces.value = response.data
    else {
      toast.add({
        severity: 'error',
        summary: 'Une erreur est survenue',
        detail: `${response.data.error}`
      })
    }
    loading.value = false
  }

  return {
    traces,
    findOneById,
    filterTraceByParams,
    initAllTraces,
    loading
  }
})
