<template>
  <Navbar />

  <div v-if="isLoading" class="loading">
    <v-alert class="col-3 text-center text-subtitle-1 mt-5"
      type="error" 
      width="700" 
      color="#f8d7da" 
      outlined
    >
      Espere por favor..
      <h3 class="mt-2">
        <v-icon icon="fa fa-spin fa-sync"></v-icon>
      </h3>
    </v-alert>
  </div>

  <div v-else class="d-flex">
    <v-col cols="4">
      <EntryList />
    </v-col>
    <v-col>
      <router-view />
    </v-col>
  </div>

</template>

<script setup>
  import { defineAsyncComponent, onMounted } from 'vue'
  import { useJournal } from '../composables/useJournal'

  const Navbar = defineAsyncComponent(() => import('../components/Navbar.vue'))
  const EntryList = defineAsyncComponent(() => import('../components/EntryList.vue'))

  const { loadEntries, isLoading } = useJournal()

  onMounted(() => { 
    loadEntries() 
  })
</script>

<style scoped>
.loading {
  display: grid;
  justify-content: center;
}

:deep() .v-alert {
  border: .1px solid transparent;
  border-color: #f5c6cb !important;
  color: #721c24;
}
</style>