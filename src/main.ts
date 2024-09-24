import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Lara from '@primevue/themes/lara'

const app = createApp(App)
app.use(ToastService)
app.use(ConfirmationService)
app.use(PrimeVue, {
  theme: {
    preset: Lara
  }
})
app.use(createPinia())
app.use(router)

app.mount('#app')
