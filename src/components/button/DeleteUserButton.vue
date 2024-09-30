<script setup lang="ts">
  import type { User } from '@/@Types/Users'
  import router from '@/router'
  import crud from '@/utils/crud'
  import { errorToast, successToast } from '@/utils/toast'
  import { useConfirm } from 'primevue/useconfirm'
  import { useToast } from 'primevue/usetoast'

  const props = defineProps<{
    user: User
  }>()

  const confirm = useConfirm()

  const toast = useToast()

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
        const res = await crud.delete(`api/users/${props.user.id}`)
        if (res.status === 204) {
          router.push('/users')
          successToast(toast, `${props.user.firstname} a bien été suppprimé`)
        } else errorToast(toast, res.data.error)
      }
    })
  }
</script>

<template>
  <Button @click="confirmation" severity="danger" outline label="Je supprime cet utilisateur" />
</template>

<style></style>
