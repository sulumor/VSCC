<script setup lang="ts">
  import { LoginSchema } from '@/schemas/LoginSchema'
  import { useUsersStore } from '@/stores/users'
  import { useForm } from 'vee-validate'
  import type { UserLogin } from '@/@Types/Users'
  import TextInput from '@/components/input/TextInput.vue'
  import PasswordInput from '@/components/input/PasswordInput.vue'

  const userStore = useUsersStore()
  const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: LoginSchema
  })

  const [email] = defineField('email')
  const [password] = defineField('password')

  const onSubmit = handleSubmit(async (values) => {
    await userStore.login(values as UserLogin)
    resetForm()
  })
</script>

<template>
  <form class="p-4 flex flex-col gap-8" @submit="onSubmit">
    <TextInput id="email" label="Email" v-model="email" aria="email-help" :errors="errors.email" />
    <PasswordInput
      id="password"
      label="Mot de passe"
      v-model="password"
      aria="password-help"
      :errors="errors.password"
      :feedback="false"
    />
    <Button type="submit">Je me connecte</Button>
  </form>
</template>

<style></style>
