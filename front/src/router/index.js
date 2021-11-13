import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Main from '@/views/Main.vue'
import Options from '@/views/Options.vue'

const routes = [
  {
    path: '/:slug',
    name: 'Main',
    component: Main
  },
  {
    path: '/:slug/options',
    name: 'options',
    component: Options
  },
  {
    path: '/:slug/menu',
    name: 'menu',
    component: Menu
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
