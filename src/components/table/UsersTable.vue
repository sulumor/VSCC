<script setup lang="ts">
  import type { Users } from '@/@Types/Users'

  defineProps<{
    users: Users
  }>()
</script>

<template>
  <DataTable
    :value="users"
    :globalFilterFields="['start', 'finish', 'elevation', 'distance']"
    filterDisplay="menu"
    dataKey="email"
    class="mt-4"
  >
    <Column
      field="firstname"
      header="Nom"
      style="min-width: max-content"
      sortable
      :showFilterMatchModes="false"
    >
      <template #body="{ data }">
        {{ data.firstname }}
      </template>
    </Column>
    <Column
      field="email"
      header="Email"
      style="min-width: max-content"
      :showFilterMatchModes="false"
    >
      <template #body="{ data }">
        {{ data.email }}
      </template>
    </Column>
    <Column
      field="isAdmin"
      header="Admin"
      :showFilterMatchModes="false"
      style="text-align: center; max-width: 5rem"
    >
      <template #body="{ data }">
        <i v-if="data.is_admin" class="pi pi-verified green icon"></i>
        <i v-else class="pi pi-times red icon"></i>
      </template>
    </Column>

    <Column header="Actions">
      <template #body="{ data }">
        <div class="flex flex-wrap justify-start items-center gap-4">
          <LinkButton label="Je modifie" :to="`/edit-user/${data.id}`" />
          <DeleteUserButton :user="data" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>
  .green {
    color: green;
  }

  .red {
    color: red;
  }

  .icon {
    font-size: 1.5rem;
  }
</style>
