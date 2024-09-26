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
      component: () => import('@/views/StravaView.vue')
    },
    {
      path: '/new-trace',
      component: () => import('@/views/AddTraceView.vue'),
      beforeEnter: () => {
        const userStore = useUsersStore()
        if (!userStore.isAuthenticated) return '/'
      }
    },
    {
      path: '/edit-trace/:id',
      component: () => import('@/views/EditTraceView.vue'),
      beforeEnter: () => {
        const userStore = useUsersStore()
        if (!userStore.isAuthenticated) return '/'
      }
    },
    {
      path: '/login',
      component: () => import('@/views/SignUpView.vue')
    }
  ]
})

export default router
