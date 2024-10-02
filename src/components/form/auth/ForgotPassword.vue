<script setup lang="ts">
  import { EmailSchema } from '@/schemas/EmailSchema'
  import { useForm } from 'vee-validate'
  import crud from '@/utils/crud'
  import { useToast } from 'primevue/usetoast'
  import { errorToast, successToast } from '@/utils/toast'

  const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: EmailSchema
  })

  const [email] = defineField('email')
  const toast = useToast()

  const onSubmit = handleSubmit(async (values) => {
    try {
      await crud.post('auth/forgot_password', values)
      successToast(toast, `Un email avec le lien à suivre vous a été envoyé`)
    } catch (error) {
      if (error instanceof Error) errorToast(toast, error.message)
    }
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
