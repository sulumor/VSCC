<script setup lang="ts">
  import type { User } from '@/@Types/Users'
  import { useUsersStore } from '@/stores/users'
  import crud from '@/utils/crud'
  import { errorToast, successToast } from '@/utils/toast'
  import { useQueryClient } from '@tanstack/vue-query'
  import { useConfirm } from 'primevue/useconfirm'
  import { useToast } from 'primevue/usetoast'

  const props = defineProps<{
    user: User
  }>()

  const confirm = useConfirm()
  const toast = useToast()
  const queryClient = useQueryClient()
  const userStore = useUsersStore()

  const confirmation = () => {
    confirm.require({
      message: `Suis-je sûr de bien vouloir supprimer ${props.user.firstname} ?`,
      header: 'Confirmation de suppression',
      rejectLabel: 'Annuler',
      rejectProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true
      },
      acceptProps: {
        label: 'Supprimer',
        severity: 'danger'
      },
      accept: async () => {
        try {
          await crud.delete(`api/users/${props.user.id}`)
          queryClient.invalidateQueries({ queryKey: ['users'] })
          successToast(toast, `${props.user.firstname} a bien été suppprimé`)
        } catch (error) {
          if (error instanceof Error) errorToast(toast, error.message)
        }
      }
    })
  }
</script>

<template>
  <Button
    @click="confirmation"
    severity="danger"
    outline
    label="Je supprime"
    :disabled="props.user.id === userStore.user.id"
  />
</template>

<style></style>
