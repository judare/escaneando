import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Main from '@/views/Main.vue'
import Options from '@/views/Options.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/options',
    name: 'options',
    component: Options
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
