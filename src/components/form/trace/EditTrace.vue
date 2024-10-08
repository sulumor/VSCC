<script setup lang="ts">
  import { getInformationsFromStravaEmbedString } from '@/utils/extractString'
  import { useToast } from 'primevue/usetoast'
  import { useForm } from 'vee-validate'
  import { TraceSchema } from '@/schemas/TraceSchema'
  import type { Trace } from '@/@Types/Traces'

  import { errorToast, successToast } from '@/utils/toast'
  import { useRouter } from 'vue-router'
  import { useQueryClient } from '@tanstack/vue-query'
  import crud from '@/utils/crud'

  const queryClient = useQueryClient()
  const router = useRouter()
  const toast = useToast()

  const props = defineProps<{ trace: Trace }>()

  const { defineField, handleSubmit, errors } = useForm({
    validationSchema: TraceSchema,
    initialValues: {
      stravaEmbed: `<div class="strava-embed-placeholder" data-embed-type="route" data-embed-id="${props.trace.strava_id}" data-style="standard" data-map-hash="${props.trace.strava_hash}" data-from-embed="true"></div>`,
      ...props.trace,
      switch: props.trace.switch ?? ' '
    }
  })

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { stravaEmbed, created_at, updated_at, ...data } = values

    const stravaData = getInformationsFromStravaEmbedString(stravaEmbed)
    if (!stravaData) {
      errorToast(toast, 'Une erreur est survenue. Veuillez réessayer plus tard')
      return
    }
    const datas = { ...stravaData, ...data }

    try {
      const res = await crud.update(`api/traces/${props.trace.id}`, datas)
      queryClient.setQueryData(['trace', props.trace.id.toString()], (oldData: Partial<Trace>) => {
        return {
          ...oldData,
          ...res
        }
      })
      queryClient.invalidateQueries({ queryKey: ['traces'] })
      successToast(toast, 'Votre trace a bien été modifié')
      router.push('/')
    } catch (error) {
      if (error instanceof Error) errorToast(toast, error.message)
    }
  })
</script>

<template>
  <form class="p-4 flex flex-col gap-8 md:w-[70%] md:mx-auto my-3" @submit="onSubmit">
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
      <CheckBoxInput v-model="isALoop" id="isALoop" label="Est une boucle" class="basis-1/2" />
      <TextInput
        id="switch"
        label="Ville de passage"
        v-model="switchCity"
        aria="switch-help"
        :errors="errors.switch"
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
    <UploadImage v-model="image" label="Modifier l'image" />
    <div class="flex justify-evenly flex-wrap gap-8">
      <TextArea
        id="description"
        v-model="description"
        label="Description"
        aria="description-help"
        :errors="errors.description"
      />
      <div>
        <StravaHelper />
        <TextArea
          id="stravaEmbed"
          v-model="stravaEmbed"
          label="Intégration Strava"
          aria="stravaEmbed-help"
          :errors="errors.stravaEmbed"
        />
      </div>
    </div>
    <Button type="submit" class="w-full mt-4">Je modifie cette trace</Button>
    <DeleteButton :id="props.trace.id" />
  </form>
</template>

<style></style>
