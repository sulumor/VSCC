<script setup lang="ts">
  import SignUpForm from '@/components/form/SignUp.vue'
</script>

<template>
  <h1 class="text-xl font-black text-center mt-4">SE CONNECTER</h1>
  <div class="flex flex-col md:w-[50%] md:mx-auto md:my-3">
    <SignUpForm />
    <RouterLink class="self-end" to="/forgot-password">Mot de passe oublié</RouterLink>
  </div>
</template>

<style></style>
