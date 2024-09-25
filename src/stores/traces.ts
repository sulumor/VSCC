import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Trace } from '@/@Types/Traces'
import crud from '@/utils/crud'
import type { AxiosResponse } from 'axios'
import { useToast } from 'primevue/usetoast'
import { errorToast, successToast } from '@/utils/toast'

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
    else errorToast(toast, response.data.error)

    loading.value = false
  }

  const addNewTrace = async (datas: any) => {
    const response: Response = await crud.post('api/traces', datas)

    if (response.status !== 200) {
      errorToast(toast, response.data.error)
      return false
    } else successToast(toast, 'Votre nouvelle trace a bien été enregistrée')

    traces.value.push(response.data)
    return true
  }

  const editATrace = async (datas: Partial<Trace>) => {
    const { id, ...data } = datas
    const response: Response = await crud.update(`api/traces/${id}`, data)
    if (response.status !== 200) {
      errorToast(toast, response.data.error)
      return false
    } else {
      successToast(toast, 'Votre trace a bien été modifiée')
    }

    const index = findIndex(id!)
    if (index !== -1) traces.value[index] = response.data
    else traces.value.push(response.data)
    return true
  }

  const deleteATrace = async (id: number) => {
    const response: Response = await crud.delete(`api/traces/${id}`)
    if (response.status !== 204) {
      errorToast(toast, response.data.error)
      return false
    } else {
      successToast(toast, 'Votre trace a bien été supprimée')
    }
    const index = findIndex(id)
    traces.value.splice(index, 1)
    return true
  }

  const findIndex: (id: number) => number = (id) => {
    return traces.value.findIndex((trace: Trace) => trace.id === id)
  }

  return {
    traces,
    findOneById,
    filterTraceByParams,
    initAllTraces,
    addNewTrace,
    editATrace,
    deleteATrace,
    loading
  }
})
