<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import { useUsersStore } from '@/stores/users'

  const userStore = useUsersStore()
  const items = ref()

  watchEffect(() => {
    items.value = [
      {
        label: 'Accueil',
        route: '/',
        connected: true
      },
      {
        label: 'Utilisateurs',
        route: '/users',
        connected: true
      },
      {
        label: "Ajouter d'une trace",
        route: '/new-trace',
        connected: userStore.isAuthenticated
      },
      {
        label: 'Connexion',
        route: '/login',
        connected: !userStore.isAuthenticated
      },
      {
        label: 'Deconnexion',
        connected: userStore.isAuthenticated,
        command: () => {
          userStore.logout()
        }
      }
    ]
  })
</script>

<template>
  <Menubar :model="items" style="background-color: #343838" class="justify-between">
    <template #start>
      <LogoImg />
    </template>
    <template #item="{ item, props }">
      <router-link
        v-if="item.connected && item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </router-link>
      <a v-if="item.connected && !item.route" v-ripple :href="item.href" v-bind="props.action">
        <span>{{ item.label }}</span>
      </a>
    </template>
  </Menubar>
</template>

<style scoped></style>
