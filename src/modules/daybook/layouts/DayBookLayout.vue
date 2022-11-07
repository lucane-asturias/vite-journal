<template>
  <Navbar />

  <div v-if="isLoading" class="row justify-content-md-center">
    <div class="col-3 alert-info text-center mt-5">
      Espere por favor..
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <router-view />
    </div>
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

<style lang="css" scoped>
</style>