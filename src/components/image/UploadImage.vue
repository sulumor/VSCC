<script setup lang="ts">
  import crud from '@/utils/crud'
  import { errorToast } from '@/utils/toast'
  import { useToast } from 'primevue/usetoast'

  const toast = useToast()
  const model = defineModel<string>()
  defineProps<{
    label: string
    errors?: string
    aria: string
  }>()

  const onUpload = async (event: any) => {
    try {
      const res = await crud.uploadToCloudinary(event.files[0])
      model.value = res?.data.public_id
    } catch (err) {
      errorToast(toast, "L'enregistrement de l'image s'est mal passé. Veuillez réessayer")
    }
  }
</script>

<template>
  <FileUpload accept="image/*" mode="basic" name="image" :chooseLabel="label" @select="onUpload" />
  <Message v-if="errors" :id="aria" class="p-error" severity="error">{{ errors }}</Message>
</template>

<style></style>
