import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Trace } from '@/@Types/Traces'
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

  const addNewTrace = async (datas: any) => {
    const response: Response = await crud.post('api/traces', datas)
    if (response.status !== 200) {
      toast.add({
        severity: 'error',
        summary: 'Une erreur est survenue',
        detail: response.data.error.includes('jwt')
          ? 'Authentification nécessaire'
          : `${response.data.error}`,
        life: 3000
      })
      return
    } else {
      toast.add({
        severity: 'success',
        summary: 'Nouvelle trace bien enregistrée',
        detail: `Votre trace de ${datas.start} à ${datas.finish} a bien été enregistrée`,
        life: 3000
      })
    }
    traces.value.push(response.data)
  }

  const editATrace = async (datas: Partial<Trace>) => {
    const { id, ...data } = datas
    const response: Response = await crud.update(`api/traces/${id}`, data)
    if (response.status !== 200) {
      toast.add({
        severity: 'error',
        summary: 'Une erreur est survenue',
        detail: response.data.error.includes('jwt')
          ? 'Authentification nécessaire'
          : `${response.data.error}`,
        life: 3000
      })
      return
    } else {
      toast.add({
        severity: 'success',
        summary: 'Trace bien modifiée',
        detail: `Votre trace de ${response.data.start} à ${response.data.finish} a bien été modifiée`,
        life: 3000
      })
    }

    const index: number = traces.value.findIndex((trace: Trace) => trace.id === id)
    if (index !== -1) traces.value[index] = response.data
    else traces.value.push(response.data)
  }

  const deleteATrace = async (id: number) => {
    const response: Response = await crud.delete(`api/traces/${id}`)
    if (response.status !== 204) {
      toast.add({
        severity: 'error',
        summary: 'Une erreur est survenue',
        detail: response.data.error.includes('jwt')
          ? 'Authentification nécessaire'
          : `${response.data.error}`,
        life: 3000
      })
      return
    } else {
      toast.add({
        severity: 'success',
        summary: 'Trace bien supprimée',
        detail: `Votre trace a bien été supprimée`,
        life: 3000
      })
    }
    const index: number = traces.value.findIndex((trace: Trace) => trace.id === id)
    traces.value.splice(index, 1)
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
