<script setup lang="ts">
  import router from '@/router'
  import crud from '@/utils/crud'
  import { errorToast, successToast } from '@/utils/toast'
  import { useConfirm } from 'primevue/useconfirm'
  import { useToast } from 'primevue/usetoast'
  const props = defineProps<{
    id: number
  }>()

  const confirm = useConfirm()
  const toast = useToast()

  const confirmation = () => {
    confirm.require({
      message: 'Suis-je sûr de bien vouloir supprimer cette trace ?',
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
          await crud.delete(`api/traces/${props.id}`)
          successToast(toast, 'Votre trace a bien été supprimé')
          router.push('/')
        } catch (error) {
          if (error instanceof Error) errorToast(toast, error.message)
        }
      }
    })
  }
</script>

<template>
  <ConfirmDialog />
  <Button @click="confirmation" severity="danger" outline label="Je supprime cette trace" />
</template>

<style></style>
