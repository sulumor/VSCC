<template>
  <main>
    <StravaTrace
      v-for="trace in fakeDatas"
      :key="trace.id"
      :id="trace.stravaId"
      :hash="trace.stravaHash"
    />
  </main>
</template>

<script setup lang="ts">
  import StravaTrace from '@/components/StravaTrace.vue'
  import { fakeDatas } from '@/fakeData'
</script>
