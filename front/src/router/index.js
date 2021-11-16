import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Main from '@/views/Main.vue'
import Options from '@/views/Options.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/Landing.vue'),
    meta: {
      layout: "default",
      title: "Recolecta datos de tus clientes con solo un click"
    }
  },
  {
    path: '/:slug',
    name: 'main',
    component: Main,
    meta: {
      title: "Poner número de celular",
      layout: "customer"
    }
  },
  {
    path: '/:slug/options',
    name: 'options',
    component: Options,
    meta: {
      title: "Escoger opción",
      layout: "customer"
    }
  },
  {
    path: '/:slug/menu',
    name: 'menu',
    component: Menu,
    meta: {
      title: "Productos",
      layout: "customer"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
