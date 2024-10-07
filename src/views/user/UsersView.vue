<script setup lang="ts">
  import crud from '@/utils/crud'
  import { useQuery } from '@tanstack/vue-query'
  const getUsers = async () => await crud.getWithToken('api/users')

  const {
    isPending,
    isError,
    data: users,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
</script>

<template>
  <main>
    <div class="flex justify-between items-center">
      <LinkButton severity="info" label="Ajouter un utilisateur" to="/new-user" class="w-auto" />
      <BackButton class="w-auto" />
    </div>
    <h1 class="text-xl font-black text-center">LISTING DES UTILISATEURS</h1>
    <MessageError v-if="isError" :error="error" />
    <ProgressSpinner v-if="isPending" aria-label="Loading" />
    <UsersTable v-if="users" :users="users" />
    <ConfirmDialog />
  </main>
</template>

<style></style>
