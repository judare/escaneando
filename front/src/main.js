import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Scrollspy from 'vue2-scrollspy';
import money from 'v-money'

createApp(App)
.use(store)
.use(router)
.use(Scrollspy)
.use(money)
.mount('#app')
