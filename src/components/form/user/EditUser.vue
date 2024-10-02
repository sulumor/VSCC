<script setup lang="ts">
  import { useToast } from 'primevue/usetoast'
  import { useForm } from 'vee-validate'

  import type { User } from '@/@Types/Users'
  import { UserSchema } from '@/schemas/UserSchema'
  import crud from '@/utils/crud'
  import { errorToast, successToast } from '@/utils/toast'
  import { useRouter } from 'vue-router'
  import { useQueryClient } from '@tanstack/vue-query'
  import EditPasswordButton from '@/components/button/EditPasswordButton.vue'

  const props = defineProps<{ user: User }>()
  const toast = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()

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
    const { id, created_at, updated_at, ...data } = values

    try {
      const res = await crud.update(`api/users/${id}`, data)
      queryClient.setQueryData(['user', props.user.id.toString()], (oldData: Partial<User>) => {
        return {
          ...oldData,
          ...res
        }
      })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      successToast(toast, `L'utilisateur ${res.firstname} a bien été modifié`)
      router.push('/users')
    } catch (error) {
      if (error instanceof Error) errorToast(toast, error.message)
    }
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

    <div class="flex justify-evenly gap-3">
      <CheckBoxInput v-model="isAdmin" id="isAdmin" label="Est administrateur" class="basis-1/2" />
      <EditPasswordButton :user="props.user" />
    </div>

    <Button type="submit" class="w-full mt-4">Je modifie cette utilisateur</Button>
  </form>
</template>

<style></style>
