<script setup lang="ts">
  import { ref } from 'vue'
  import { FilterMatchMode } from '@primevue/core/api'
  import Column from 'primevue/column'
  import DataTable from 'primevue/datatable'
  import DetailButton from '../button/DetailButton.vue'
  import { useTracesStore } from '@/stores/traces'
  import InputText from 'primevue/inputtext'
  import Slider from 'primevue/slider'
  import MultiSelect from 'primevue/multiselect'

  const traceStore = useTracesStore()
  const filters = ref({
    start: { value: null, matchMode: FilterMatchMode.IN },
    finish: { value: null, matchMode: FilterMatchMode.IN },
    distance: { value: null, matchMode: FilterMatchMode.BETWEEN },
    elevation: { value: null, matchMode: FilterMatchMode.BETWEEN }
  })

  const starts = ref([...new Set(traceStore.traces.map((trace: { start: string }) => trace.start))])
  const finishes = ref([
    ...new Set(traceStore.traces.map((trace: { finish: string }) => trace.finish))
  ])
</script>

<template>
  <DataTable
    :value="traceStore.traces"
    v-model:filters="filters"
    :globalFilterFields="['start', 'finish', 'elevation', 'distance']"
    filterDisplay="menu"
    dataKey="id"
  >
    <Column field="start" header="Départ" style="width: 12rem" :showFilterMatchModes="false">
      <template #filter="{ filterModel, filterCallback }">
        <MultiSelect
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="starts"
          placeholder="Ville de départ(s)"
        />
      </template>
      <template #body="{ data }">
        {{ data.start }}
      </template>
    </Column>
    <Column field="finish" header="Arrivée" style="width: 12rem" :showFilterMatchModes="false">
      <template #filter="{ filterModel, filterCallback }">
        <MultiSelect
          v-model="filterModel.value"
          @change="filterCallback()"
          :options="finishes"
          placeholder="Ville d'arrivée(s)"
        />
      </template>
      <template #body="{ data }">
        {{ data.start }}
      </template>
    </Column>
    <Column field="distance" header="Distance" style="width: 12rem" :showFilterMatchModes="false">
      <template #filter="{ filterModel, filterCallback }">
        <Slider v-model="filterModel.value" range min="50" max="300" @change="filterCallback()" />
        <InputText v-model="filterModel.value" placeholder="Entre 50 et 300 km" disabled />
      </template>
      <template #body="{ data }">
        {{ data.distance }}
      </template>
    </Column>
    <Column field="elevation" header="Dénivelé" style="width: 12rem" :showFilterMatchModes="false">
      <template #filter="{ filterModel, filterCallback }">
        <Slider v-model="filterModel.value" range min="300" max="3500" @change="filterCallback()" />
        <InputText v-model="filterModel.value" placeholder="Entre 300 et 3500 D+" disabled />
      </template>
      <template #body="{ data }">
        {{ data.elevation }}
      </template></Column
    >
    <Column field="description" header="Description" style="min-width: 12rem"></Column>
    <Column header="En savoir plus">
      <template #body="{ data }">
        <DetailButton :id="data.id" />
      </template>
    </Column>
  </DataTable>
</template>

<style></style>
