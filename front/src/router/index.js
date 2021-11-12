import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Main from '@/views/Main.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
