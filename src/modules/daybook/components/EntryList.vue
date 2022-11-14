<template>
  <div class="entry-list-container">
    <div class="p-2">
      <v-text-field
        type="text"
        density="compact"
        variant="outlined"
        class="pt-2 mx-2"
        append-inner-icon="fa fa-search"
        placeholder="Buscar entrada"
        v-model="data.term"
      />
    </div>

    <div class="d-flex flex-column">
      <v-btn color="primary" class="mx-2 mb-5"
        @click="$router.push({ name: 'entry', params: { id: 'new' } })">
        <i class="fa fa-plus-circle">
          Nova entrada
        </i>
      </v-btn>
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

<style lang="css" scoped>
.entry-list-container{
  border-right: 1px solid #2c3e50;
  height: calc( 100vh - 56px );
}

.entry-scrollarea{
  height: calc( 100vh - 110px );
  overflow: scroll;
}
</style>
