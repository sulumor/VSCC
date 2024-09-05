<script setup lang="ts">
  import { ref } from 'vue'
  import LogoImg from '../logo/LogoImg.vue'

  const items = ref([
    {
      label: 'Accueil',
      route: '/'
    },
    {
      label: "Ajout d'une trace",
      route: '/new-trace'
    }
  ])
</script>

<template>
  <Menubar :model="items" style="background-color: #343838" class="justify-between">
    <template #start>
      <LogoImg />
    </template>
    <template #item="{ item, props }">
      <router-link v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span>{{ item.label }}</span>
        </a>
      </router-link>
    </template>
  </Menubar>
</template>

<style scoped></style>
