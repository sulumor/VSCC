<script setup lang="ts">
  import type { User } from '@/@Types/Users'
  import { useUsersStore } from '@/stores/users'
  import crud from '@/utils/crud'
  import { errorToast, successToast } from '@/utils/toast'
  import { useConfirm } from 'primevue/useconfirm'
  import { useToast } from 'primevue/usetoast'
  const props = defineProps<{
    user: User
  }>()

  const confirm = useConfirm()
  const toast = useToast()
  const userStore = useUsersStore()

  const confirmation = () => {
    confirm.require({
      message: `Suis-je sûr de bien vouloir faire une demande de modification de mot de passe pour ${props.user.firstname} ?`,
      header: 'Confirmation de changement de mot de passe',
      rejectLabel: 'Annuler',
      rejectProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true
      },
      acceptProps: {
        label: 'Confirmer',
        severity: 'info'
      },
      accept: async () => {
        try {
          await crud.post('auth/forgot_password', { email: props.user.email })
          successToast(
            toast,
            `${userStore.user.firstname}, un email avec le lien à suivre a été envoyé à ${props.user.firstname}`
          )
        } catch (error) {
          if (error instanceof Error) errorToast(toast, error.message)
        }
      }
    })
  }
</script>

<template>
  <ConfirmDialog />
  <Button @click="confirmation" severity="info" outline label="Changement de mot de passe" />
</template>

<style></style>
