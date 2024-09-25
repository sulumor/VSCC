<script setup lang="ts">
  import TextInput from '../input/TextInput.vue'
  import NumberInput from '../input/NumberInput.vue'
  import { getInformationsFromStravaEmbedString } from '@/utils/extractString'
  import { useToast } from 'primevue/usetoast'
  import { useForm } from 'vee-validate'
  import { TraceSchema } from '@/schemas/TraceSchema'
  import { useTracesStore } from '@/stores/traces'
  import type { Trace } from '@/@Types/Traces'
  import DeleteButton from '../button/DeleteButton.vue'
  import CheckBoxInput from '../input/CheckBoxInput.vue'
  import { errorToast } from '@/utils/toast'
  import router from '@/router'

  const traceStore = useTracesStore()

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
    if (await traceStore.editATrace(datas)) router.push('/')
  })
</script>

<template>
  <form class="p-4 flex flex-col gap-8 md:w-[70%] md:mx-auto md:my-3" @submit="onSubmit">
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
    <div class="flex justify-evenly flex-wrap gap-8">
      <TextArea
        id="description"
        v-model="description"
        label="Description"
        aria="description-help"
        :errors="errors.description"
      />
      <TextArea
        id="stravaEmbed"
        v-model="stravaEmbed"
        label="Intégration Strava"
        aria="stravaEmbed-help"
        :errors="errors.stravaEmbed"
      />
    </div>
    <Button type="submit" class="w-full mt-4">Je modifie cette trace</Button>
    <DeleteButton :id="props.trace.id" />
  </form>
</template>

<style></style>
