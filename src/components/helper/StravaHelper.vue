<script setup lang="ts">
  import { ref } from 'vue'

  const visible = ref(false)
  const helpers = [
    {
      image: '/helper/helperStrava-1.png',
      name: 'Etape 1',
      description:
        "Depuis l'application Strava, allez sur le menu Tableau de bord puis Mes itinéraires"
    },
    {
      image: '/helper/helperStrava-2.png',
      name: 'Etape 2',
      description: 'Choisissez la trace à ajouter, cliquez sur les trois points puis Intégrer'
    },
    {
      image: '/helper/helperStrava-3.png',
      name: 'Etape 3',
      description:
        "Attendre quelques secondes que le data-map-hash apparaisse puis Copier le code d'intégration"
    },
    {
      image: '/helper/helperStrava-4.png',
      name: 'Etape 4',
      description: 'Coller le tout dans la partie Intégration Strava'
    }
  ]
</script>

<template>
  <div>
    <i class="pi pi-question-circle" style="font-size: 1.5rem" @click="visible = true"></i>
    <Dialog
      v-model:visible="visible"
      modal
      header="Aide intégration Strava"
      :style="{ width: '90vw' }"
    >
      <Carousel :value="helpers" :numVisible="1" :numScroll="1">
        <template #item="slotProps">
          <div class="flex flex-col h-[70vh] gap-6">
            <div class="font-medium text-lg self-center">
              {{ slotProps.data.name }}
            </div>
            <img
              :src="slotProps.data.image"
              :alt="slotProps.data.name"
              class="rounded h-[60%] object-contain"
            />
            <div class="font-medium text-lg self-center">
              {{ slotProps.data.description }}
            </div>
          </div>
        </template>
      </Carousel>
    </Dialog>
  </div>
</template>

<style></style>
