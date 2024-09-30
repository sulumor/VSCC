<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import crud from '@/utils/crud'
  import DeleteUserButton from '../button/DeleteUserButton.vue'
  import { useQuery } from '@tanstack/vue-query'
  import axios, { AxiosError } from 'axios'

  const getUsers = async () => await crud.getWithToken('api/users')

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })
</script>

<template>
  <ConfirmDialog />
  <DataTable
    :value="data"
    :globalFilterFields="['start', 'finish', 'elevation', 'distance']"
    filterDisplay="menu"
    dataKey="email"
  >
    <Column
      field="firstname"
      header="Nom"
      style="min-width: 12rem"
      sortable
      :showFilterMatchModes="false"
    >
      <template #body="{ data }">
        {{ data.firstname }}
      </template>
    </Column>
    <Column field="email" header="Email" style="min-width: 12rem" :showFilterMatchModes="false">
      <template #body="{ data }">
        {{ data.email }}
      </template>
    </Column>
    <Column
      field="isAdmin"
      header="Super admin"
      style="min-width: 12rem"
      :showFilterMatchModes="false"
    >
      <template #body="{ data }">
        {{ data.is_admin }}
      </template>
    </Column>

    <Column header="En savoir plus">
      <template #body="{ data }">
        <Button
          severity="success"
          label="Éditer cette utilisateur"
          as="router-link"
          :to="'/edit-user/' + data.id"
        />
        <DeleteUserButton :user="data" />
      </template>
    </Column>
  </DataTable>
  <div v-if="isError">{{ error }}</div>
  <ProgressSpinner v-if="isPending" aria-label="Loading" />
</template>

<style></style>
