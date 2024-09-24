<script setup lang="ts">
  import router from '@/router'
  import { useTracesStore } from '@/stores/traces'
  import { useConfirm } from 'primevue/useconfirm'
  const props = defineProps<{
    id: number
  }>()

  const confirm = useConfirm()

  const traceStore = useTracesStore()

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
        traceStore.deleteATrace(props.id)
        router.push('/')
      }
    })
  }
</script>

<template>
  <ConfirmDialog />
  <Button @click="confirmation" severity="danger" outline label="Je supprime cette trace" />
</template>

<style></style>
