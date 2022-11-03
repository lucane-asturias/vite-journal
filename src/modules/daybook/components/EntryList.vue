<template>
  <div class="entry-list-container">
    <div class="p-2">
      <input 
        type="text"
        class="form-control"
        placeholder="Buscar entrada"
        v-model="term"
      />
    </div>

    <div class="mt-2 d-flex flex-column">
      <button class="btn btn-primary mx-3"
        @click="$router.push({ name: 'entry', params: { id: 'new' } })">
        <i class="fa fa-plus-circle">
          Nova entrada
        </i>
      </button>
    </div>

    <div class="entry-scrollarea">
      <Entry
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed, defineAsyncComponent, ref } from 'vue'
  import { getEntriesByTerm } from '../composables/useJournal'

  const Entry = defineAsyncComponent(() => import('../components/Entry.vue'))

  const term = ref()

  const entriesByTerm = computed(() => getEntriesByTerm(term.value)) 
</script>



<style lang="scss" scoped>
.entry-list-container{
  border-right: 1px solid #2c3e50;
  height: calc( 100vh - 56px );
}

.entry-scrollarea{
  height: calc( 100vh - 110px );
  overflow: scroll;
}
</style>
