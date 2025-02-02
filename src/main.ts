import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router/router.ts'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';
const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
  .use(router)
  .use(ToastService)
  .mount('#app')

