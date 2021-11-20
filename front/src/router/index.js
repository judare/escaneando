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
    path: '/login',
    name: 'login',
    component: () => import('@/views/Backoffice/Auth/Login.vue'),
    meta: {
      layout: "default",
      title: "Iniciar sesión"
    }
  },
  {
    path: '/forgotPassword/:userId/:restoreToken',
    name: 'forgotPassword',
    component: () => import('@/views/Backoffice/Auth/ForgotPassword.vue'),
    meta: {
      layout: "default",
      title: "Recuperar contraseña"
    }
  },
  {
    path: '/backoffice',
    name: 'backoffice-home',
    component: () => import('@/views/Backoffice/Home.vue'),
    meta: {
      layout: "backoffice",
      title: "👋🏻  😄",
      menuExpand: false
    }
  },
  {
    path: '/backoffice/products',
    name: 'backoffice-products',
    component: () => import('@/views/Backoffice/Products.vue'),
    meta: {
      layout: "backoffice",
      title: "Productos",
      menuExpand: true
    }
  },
  {
    path: '/backoffice/customers',
    name: 'backoffice-customers',
    component: () => import('@/views/Backoffice/Customers.vue'),
    meta: {
      layout: "backoffice",
      title: "Clientes",
      menuExpand: true
    }
  },
  {
    path: '/backoffice/reports',
    name: 'backoffice-reports',
    component: () => import('@/views/Backoffice/Reports.vue'),
    meta: {
      layout: "backoffice",
      title: "Reportes",
      menuExpand: true
    }
  },
  {
    path: '/backoffice/config',
    name: 'backoffice-config',
    component: () => import('@/views/Backoffice/Config.vue'),
    meta: {
      layout: "backoffice",
      title: "Configuraciones",
      menuExpand: true
    }
  },

  
  {
    path: '/sitio/:slug',
    name: 'main',
    component: Main,
    meta: {
      title: "Poner número de celular",
      layout: "customer"
    }
  },
  {
    path: '/sitio/:slug/options',
    name: 'options',
    component: Options,
    meta: {
      title: "Escoger opción",
      layout: "customer"
    }
  },
  {
    path: '/sitio/:slug/menu',
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
