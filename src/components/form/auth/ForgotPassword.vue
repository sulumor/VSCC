<script setup lang="ts">
  import { EmailSchema } from '@/schemas/EmailSchema'
  import { useForm } from 'vee-validate'
  import TextInput from '../input/TextInput.vue'
  import crud from '@/utils/crud'
  import { useToast } from 'primevue/usetoast'
  import { errorToast, successToast } from '@/utils/toast'

  const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: EmailSchema
  })

  const [email] = defineField('email')
  const toast = useToast()

  const onSubmit = handleSubmit(async (values) => {
    const res = await crud.post('auth/forgot_password', values)
    if (res.status === 204) successToast(toast, 'Un email avec le lien à suivre vous a été envoyé')
    else errorToast(toast, res.data.error)
    resetForm()
  })
</script>

<template>
  <form class="p-4 gap-8 flex flex-col md:w-[50%] md:mx-auto md:my-3" @submit="onSubmit">
    <TextInput id="email" label="Email" v-model="email" aria="email-help" :errors="errors.email" />
    <Button type="submit">J'envoie</Button>
  </form>
</template>

<style></style>
