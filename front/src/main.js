import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Scrollspy from 'vue2-scrollspy';


createApp(App).use(store).use(router).use(Scrollspy).mount('#app')
