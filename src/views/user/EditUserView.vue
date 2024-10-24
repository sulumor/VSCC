<script setup lang="ts">
  import crud from '@/utils/crud'
  import { useQuery } from '@tanstack/vue-query'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const id = Number.parseInt(route.params.id as string, 10)

  const getUserById = async () => await crud.getWithToken(`api/users/${id}`)
  const {
    data: user,
    isError,
    error,
    isLoading
  } = useQuery({
    queryKey: ['user', id.toString()],
    queryFn: getUserById
  })
</script>

<template>
  <main>
    <BackButton class="w-auto self-end" />
    <h1 class="text-xl font-black text-center">
      EDITER L'UTILISATEUR {{ user?.firstname.toUpperCase() }}
    </h1>
    <MessageError v-if="isError" :error="error" />
    <ProgressSpinner v-if="isLoading" aria-label="loading" />
    <EditUser v-if="user" :user="user" />
  </main>
</template>

<style></style>
