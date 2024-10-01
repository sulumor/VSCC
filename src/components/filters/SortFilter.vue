<script setup lang="ts">
  import { ref } from 'vue'

  const sortKey = defineModel('sortKey', { required: true })
  const sortField = defineModel('sortField', { required: true })
  const sortOrder = defineModel('sortOrder', { required: true })

  const op = ref()
  const toggle = (event: any) => {
    op.value.toggle(event)
  }

  const sortDistanceOptions = ref([
    { label: 'Distance croissante', value: 'distance' },
    { label: 'Distance décroissante', value: '!distance' }
  ])
  const sortElevationOptions = ref([
    { label: 'Dénivelé croissant', value: 'elevation' },
    { label: 'Dénivelé décroissant', value: '!elevation' }
  ])
  const onSortChange = (event: any) => {
    const value = event.value.value
    const sortValue = event.value

    if (value.indexOf('!') === 0) {
      sortOrder.value = -1
      sortField.value = value.substring(1, value.length)
      sortKey.value = sortValue
    } else {
      sortOrder.value = 1
      sortField.value = value
      sortKey.value = sortValue
    }
  }
</script>

<template>
  <Button type="button" label="Tri" @click="toggle" class="mx-2" />
  <Popover ref="op">
    <Select
      v-model="sortKey"
      :options="sortDistanceOptions"
      optionLabel="label"
      placeholder="Trier par distance"
      @change="onSortChange($event)"
    />
    <Select
      v-model="sortKey"
      :options="sortElevationOptions"
      optionLabel="label"
      placeholder="Trier par dénivelé"
      @change="onSortChange($event)"
    />
  </Popover>
</template>

<style></style>
