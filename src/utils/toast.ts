import type { ToastServiceMethods } from 'primevue/toastservice'

export const errorToast = (toast: ToastServiceMethods, message: string) => {
  toast.add({
    severity: 'error',
    summary: 'Une erreur est survenue',
    detail: message.includes('jwt') ? 'Authentification nécessaire' : `${message}`,
    life: 5000
  })
}

export const successToast = (toast: ToastServiceMethods, message: string) => {
  toast.add({
    severity: 'success',
    summary: "Tous c'est bien passé",
    detail: message,
    life: 3000
  })
}
