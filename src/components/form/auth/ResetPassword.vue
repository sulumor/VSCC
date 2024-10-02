<script setup lang="ts">
  import { PasswordSchema } from '@/schemas/PasswordSchema'
  import { useForm } from 'vee-validate'
  import crud from '@/utils/crud'
  import { useToast } from 'primevue/usetoast'
  import { errorToast, successToast } from '@/utils/toast'
  import router from '@/router'
  import { useRoute } from 'vue-router'

  const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: PasswordSchema
  })

  const [password] = defineField('password')
  const toast = useToast()
  const route = useRoute()

  const onSubmit = handleSubmit(async (values) => {
    try {
      await crud.post('auth/reset_password', {
        id: route.params.id as string,
        token: route.params.token as string,
        ...values
      })
      successToast(
        toast,
        'Votre mot de passe à bien été modifié. Vous pouvez vous connecter de nouveau'
      )
      router.push('/login')
    } catch (error) {
      if (error instanceof Error) errorToast(toast, error.message)
    }
    resetForm()
  })
</script>

<template>
  <form class="p-4 gap-8 flex flex-col md:w-[50%] md:mx-auto md:my-3" @submit="onSubmit">
    <PasswordInput
      id="password"
      label="Mot de passe"
      v-model="password"
      aria="password-help"
      :errors="errors.password"
      :feedback="false"
    />
    <Button type="submit">Je modifie mon mot de passe</Button>
  </form>
</template>

<style></style>
