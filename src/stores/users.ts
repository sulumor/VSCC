import type { Response } from '@/@Types/Response'
import type { UserBody, UserLogin } from '@/@Types/Users'
import crud from '@/utils/crud'
import { errorToast, successToast } from '@/utils/toast'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const toast = useToast()
  const user = ref()
  const loading = ref(false)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value.is_admin)

  const login = async (datas: UserLogin) => {
    loading.value = true

    const res: Response = await crud.post('auth/login', datas)
    if (res.status === 200) {
      localStorage.setItem('token', res.data.accessToken)
      user.value = jwtDecode(res.data.accessToken)
      successToast(toast, `${user.value.firstname}, vous êtes bien connecté(e)`)
    } else errorToast(toast, res.data.error)

    loading.value = false
  }

  const register = async (datas: UserBody) => {
    loading.value = true

    const res: Response = await crud.post('auth/register', datas)
    if (res.status === 200) {
      localStorage.setItem('token', res.data.accessToken)
      user.value = jwtDecode(res.data.accessToken)
    } else errorToast(toast, res.data.error)

    loading.value = false
  }

  const logout = async () => {
    localStorage.removeItem('token')
    await crud.delete('auth/refresh_token')
    user.value = null
    loading.value = false
    successToast(toast, 'Vous êtes bien déconnecté(e). A bientôt')
  }

  return { user, login, register, logout, isAuthenticated, isAdmin }
})
