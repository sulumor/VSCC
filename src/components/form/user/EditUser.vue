<script setup lang="ts">
  import TextInput from '../input/TextInput.vue'
  import { useToast } from 'primevue/usetoast'
  import { useForm } from 'vee-validate'

  import CheckBoxInput from '../input/CheckBoxInput.vue'
  import type { User } from '@/@Types/Users'
  import { UserSchema } from '@/schemas/UserSchema'
  import crud from '@/utils/crud'

  const props = defineProps<{ user: User }>()

  const { defineField, handleSubmit, errors } = useForm({
    validationSchema: UserSchema,
    initialValues: {
      ...props.user
    }
  })

  const [firstname] = defineField('firstname')
  const [email] = defineField('email')
  const [isAdmin] = defineField('is_admin')

  const onSubmit = handleSubmit(async (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    console.log(values)

    const { id, created_at, updated_at, ...data } = values
    const res = await crud.update(`api/users/${id}`, data)
    console.log(res)
  })
</script>

<template>
  <form class="p-4 flex flex-col gap-8 md:w-[70%] md:mx-auto my-3" @submit="onSubmit">
    <div class="flex justify-evenly gap-3">
      <TextInput
        id="firstname"
        label="Nom"
        v-model="firstname"
        aria="firstname-help"
        :errors="errors.firstname"
        class="basis-1/2"
      />
      <TextInput
        id="email"
        label="Email"
        v-model="email"
        aria="email-help"
        :errors="errors.email"
        class="basis-1/2"
      />
    </div>

    <CheckBoxInput v-model="isAdmin" id="isAdmin" label="Est administrateur" class="basis-1/2" />

    <Button type="submit" class="w-full mt-4">Je modifie cette utilisateur</Button>
  </form>
</template>

<style></style>
