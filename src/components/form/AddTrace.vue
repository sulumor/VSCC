<script setup lang="ts">
  import TextInput from '../input/TextInput.vue'
  import NumberInput from '../input/NumberInput.vue'
  import { fakeDatas } from '@/fakeData'
  import { getInformationsFromStravaEmbedString } from '@/utils/extractString'
  import { useToast } from 'primevue/usetoast'
  import router from '@/router'
  import { useForm } from 'vee-validate'
  import { TraceSchema } from '@/schemas/TraceSchema'

  const toast = useToast()

  const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: TraceSchema
  })

  const [start] = defineField('start')
  const [finish] = defineField('finish')
  const [distance] = defineField('distance')
  const [elevation] = defineField('elevation')
  const [description] = defineField('description')
  const [stravaEmbed] = defineField('stravaEmbed')

  const onSubmit = handleSubmit((values) => {
    const { stravaEmbed, ...data } = values
    const stravaData = getInformationsFromStravaEmbedString(stravaEmbed)
    if (!stravaData) {
      toast.add({
        severity: 'error',
        summary: 'Une erreur est survenue',
        detail:
          "Une erreur est survenue lors de l'enregistrement de la trace. Veuillez réessayer plus tard",
        life: 3000
      })
      return
    }
    fakeDatas.push({
      id: fakeDatas.length + 1,
      start: '',
      finish: '',
      description: '',
      distance: 0,
      elevation: 0,
      ...stravaData,
      ...data
    })
    resetForm()
    toast.add({
      severity: 'success',
      summary: 'Nouvelle trace bien enregistrée',
      detail: `Votre trace de ${data.start} à ${data.finish} a bien été enregistrée`,
      life: 3000
    })
    router.push('/')
  })
</script>

<template>
  <form class="p-4 flex flex-col gap-8" @submit="onSubmit">
    <div class="flex justify-evenly gap-3">
      <TextInput
        id="start"
        label="Départ"
        v-model="start"
        aria="start-help"
        :errors="errors.start"
        class="basis-1/2"
      />
      <TextInput
        id="finish"
        label="Arrivée"
        v-model="finish"
        aria="finish-help"
        :errors="errors.finish"
        class="basis-1/2"
      />
    </div>
    <div class="flex justify-evenly gap-3">
      <NumberInput
        id="distance"
        suffix=" km"
        label="Distance"
        v-model="distance"
        aria="distance-help"
        :errors="errors.distance"
        :step="5"
        class="basis-1/2"
      />
      <NumberInput
        id="elevation"
        suffix=" m D+"
        label="Dénivelé"
        v-model="elevation"
        aria="elevation-help"
        :errors="errors.elevation"
        :step="50"
        class="basis-1/2"
      />
    </div>
    <div class="flex justify-evenly flex-wrap gap-8">
      <TextArea
        v-model="description"
        label="Description"
        aria="description-help"
        :errors="errors.description"
      />
      <TextArea
        v-model="stravaEmbed"
        label="Intégration Strava"
        aria="stravaEmbed-help"
        :errors="errors.stravaEmbed"
      />
    </div>
    <Button type="submit" class="w-full mt-4">Enregistrer</Button>
  </form>
</template>

<style></style>
