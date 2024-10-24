import type { Response } from '@/@Types/Response'
import type { UserBody, UserLogin } from '@/@Types/Users'
import { useRouter } from 'vue-router'
import crud from '@/utils/crud'
import { errorToast, successToast } from '@/utils/toast'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const router = useRouter()
  const toast = useToast()
  const user = ref()
  const loading = ref(false)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.is_admin ?? false)

  const login = async (datas: UserLogin) => {
    try {
      const res = await crud.post('auth/login', datas)
      localStorage.setItem('token', res.accessToken)
      localStorage.setItem('refresh-token', res.refreshToken)
      user.value = jwtDecode(res.accessToken)
      router.push('/')
      successToast(toast, `${user.value.firstname}, vous êtes bien connecté(e)`)
    } catch (error) {
      if (error instanceof Error) errorToast(toast, error.message as string)
    }
  }

  const register = async (datas: UserBody) => {
    loading.value = true
    try {
      const res: Response = await crud.post('auth/register', datas)
      localStorage.setItem('token', res.accessToken)
      user.value = jwtDecode(res.accessToken)
    } catch (error) {
      if (error instanceof Error) errorToast(toast, error.message)
    }
    loading.value = false
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh-token')
    user.value = null
    loading.value = false
    router.push('/')
    successToast(toast, 'Vous êtes bien déconnecté(e). A bientôt')
  }

  const loadUserFromToken = async () => {
    if (localStorage.getItem('refresh-token')) {
      loading.value = true
      try {
        const res: Response = await crud.getWithRefreshToken('auth/user')
        localStorage.setItem('token', res.accessToken)
        user.value = jwtDecode(res.accessToken)
      } catch (error) {
        localStorage.clear()
      }
      loading.value = false
    }
  }

  return { user, login, register, logout, isAuthenticated, isAdmin, loadUserFromToken }
})
