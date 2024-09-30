<script setup lang="ts">
  import crud from '@/utils/crud'
  import { onMounted, ref } from 'vue'

  import { useRoute } from 'vue-router'

  const route = useRoute()

  const user = ref()
  onMounted(async () => {
    const res = await crud.getWithToken(`api/users/${route.params.id}`)
    if (res.status === 200) user.value = res.data
  })
</script>

<template>
  <main>
    <h1 class="text-xl font-black text-center">
      EDITER L'UTILISATEUR {{ user?.firstname.toUpperCase() }}
    </h1>
    <div v-if="!user">Une erreur est survenu. Veuillez réessayer plus tard</div>
    <EditUser v-else :user="user" />
  </main>
</template>

<style></style>
