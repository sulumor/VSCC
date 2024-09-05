import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('@/views/AddTraceView.vue')
    }
  ]
})

export default router
