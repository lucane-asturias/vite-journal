<template>
  <div class="entry-list-container">
    <div class="p-2">
      <input 
        type="text"
        class="form-control"
        placeholder="Buscar entrada"
        v-model="data.term"
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

<script lang="ts" setup>
  import { computed, defineAsyncComponent, reactive } from 'vue'
  import { Entry as EntryType } from '../store/journalStore'
  import { useJournal } from '../composables/useJournal'

  const Entry = defineAsyncComponent(() => import('../components/Entry.vue'))

  const { getEntriesByTerm } = useJournal() 

  const data = reactive({ term: '' })

  const entriesByTerm = computed<EntryType>(() => getEntriesByTerm(data.term)) 

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
