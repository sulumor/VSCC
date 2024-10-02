<script setup lang="ts">
  import SignUpForm from '@/components/form/auth/SignUp.vue'
</script>

<template>
  <main>
    <h1 class="text-xl font-black text-center">SE CONNECTER</h1>
    <div class="flex flex-col md:w-[50%] md:mx-auto md:my-3">
      <SignUpForm />
      <RouterLink class="self-end" to="/forgot-password">Mot de passe oublié</RouterLink>
    </div>
  </main>
</template>

<style></style>
