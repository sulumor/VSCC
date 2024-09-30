import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUsersStore } from '@/stores/users'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:id',
      component: () => import('@/views/trace/StravaView.vue')
    },
    {
      path: '/new-trace',
      component: () => import('@/views/trace/AddTraceView.vue'),
      beforeEnter: () => {
        const userStore = useUsersStore()
        if (!userStore.isAuthenticated) return '/'
      }
    },
    {
      path: '/edit-trace/:id',
      component: () => import('@/views/trace/EditTraceView.vue'),
      beforeEnter: () => {
        const userStore = useUsersStore()
        if (!userStore.isAuthenticated) return '/'
      }
    },
    {
      path: '/login',
      component: () => import('@/views/auth/SignUpView.vue')
    },
    {
      path: '/forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue')
    },
    {
      path: '/reset-password/:id/:token',
      component: () => import('@/views/auth/ResetPasswordView.vue')
    }
  ]
})

export default router
