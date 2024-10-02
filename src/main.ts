import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Lara from '@primevue/themes/lara'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000
    }
  }
})

const app = createApp(App)
app.use(ToastService)
app.use(ConfirmationService)
app.use(PrimeVue, {
  theme: {
    preset: Lara
  },
  locale: {
    emptySearchMessage: 'Aucun résultat de trouvé',
    emptyMessage: 'Aucun résultat de trouvé',
    noFileChosenMessage: 'Aucun fichier de selectionné'
  }
})
app.use(createPinia())
app.use(VueQueryPlugin, { queryClient })
app.use(router)

app.mount('#app')
