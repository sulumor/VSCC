<script setup lang="ts">
  import { getInformationsFromStravaEmbedString } from '@/utils/extractString'
  import { useToast } from 'primevue/usetoast'

  import { useForm } from 'vee-validate'
  import { TraceSchema } from '@/schemas/TraceSchema'
  import { errorToast, successToast } from '@/utils/toast'
  import crud from '@/utils/crud'
  import { useQueryClient } from '@tanstack/vue-query'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const toast = useToast()
  const queryClient = useQueryClient()
  const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: TraceSchema
  })

  const [title] = defineField('title')
  const [start] = defineField('start')
  const [finish] = defineField('finish')
  const [isALoop] = defineField('is_a_loop')
  const [switchCity] = defineField('switch')
  const [distance] = defineField('distance')
  const [elevation] = defineField('elevation')
  const [image] = defineField('image')
  const [description] = defineField('description')
  const [stravaEmbed] = defineField('stravaEmbed')

  const onSubmit = handleSubmit(async (values) => {
    const { stravaEmbed, ...data } = values
    const stravaData = getInformationsFromStravaEmbedString(stravaEmbed)
    if (!stravaData) {
      errorToast(
        toast,
        "Une erreur est survenue lors de l'enregistrement de la trace. Veuillez réessayer plus tard"
      )
      return
    }
    const datas = { ...stravaData, ...data }

    try {
      await crud.post('api/traces', datas)
      successToast(toast, 'Votre nouvelle trace a bien été enregistrée')
      queryClient.invalidateQueries({ queryKey: ['traces'] })
      router.push('/')
      resetForm()
    } catch (error) {
      if (error instanceof Error) errorToast(toast, error.message)
    }
  })
</script>

<template>
  <form class="p-4 flex flex-col gap-8 md:w-[70%] md:mx-auto md:my-3" @submit="onSubmit">
    <div class="flex flex-wrap justify-evenly gap-3">
      <TextInput
        id="title"
        label="Titre"
        v-model="title"
        aria="title-help"
        :errors="errors.title"
        class="w-full md:basis-1/2"
      />
      <UploadImage
        v-model="image"
        label="Ajouter une image"
        :errors="errors.image"
        aria="image-help"
        class="w-full md:basis-1/2"
      />
    </div>
    <div class="flex flex-wrap justify-evenly gap-3">
      <TextInput
        id="start"
        label="Départ"
        v-model="start"
        aria="start-help"
        :errors="errors.start"
        class="w-full md:basis-1/2"
      />
      <TextInput
        id="finish"
        label="Arrivée"
        v-model="finish"
        aria="finish-help"
        :errors="errors.finish"
        class="w-full md:basis-1/2"
      />
    </div>
    <div class="flex flex-wrap justify-evenly gap-3">
      <CheckBoxInput
        v-model="isALoop"
        id="isALoop"
        label="Est une boucle"
        class="w-full md:basis-1/2"
      />
      <TextInput
        id="switch"
        label="Ville de passage"
        v-model="switchCity"
        aria="switch-help"
        :errors="errors.switch"
        class="w-full md:basis-1/2"
      />
    </div>
    <div class="flex flex-wrap justify-evenly gap-3">
      <NumberInput
        id="distance"
        suffix=" km"
        label="Distance"
        v-model="distance"
        aria="distance-help"
        :errors="errors.distance"
        :step="5"
        class="w-full md:basis-1/2"
      />
      <NumberInput
        id="elevation"
        suffix=" m D+"
        label="Dénivelé"
        v-model="elevation"
        aria="elevation-help"
        :errors="errors.elevation"
        :step="50"
        class="w-full md:basis-1/2"
      />
    </div>
    <div class="flex justify-evenly flex-wrap gap-8">
      <TextArea
        id="description"
        v-model="description"
        label="Description"
        aria="description-help"
        :errors="errors.description"
        class="w-full"
      />
      <div class="flex w-full gap-4">
        <TextArea
          id="stravaEmbed"
          v-model="stravaEmbed"
          label="Intégration Strava"
          aria="stravaEmbed-help"
          :errors="errors.stravaEmbed"
          class="w-full"
        />
        <StravaHelper />
      </div>
    </div>
    <Button type="submit" class="w-full mt-4">J'enregistre cette trace</Button>
  </form>
</template>

<style></style>
