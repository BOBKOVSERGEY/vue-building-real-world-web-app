import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:page?',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/search/:letters?/:page?',
      name: 'search',
      component: () => import('@/views/SearchView.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/ErrorView.vue')
    },
  ]
})

export default router
