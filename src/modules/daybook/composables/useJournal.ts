import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useJournalStore } from '../store/journalStore'

export const useJournal = () => {
  const journalStore = useJournalStore()
  const { getEntriesByTerm, getEntriesById, isLoading } = storeToRefs(journalStore)

  return {
    // State
    isLoading,

    // Getters
    getEntriesByTerm: (term: '') => journalStore.getEntriesByTerm(term),
    getEntriesById: (entryId: '') => journalStore.getEntriesById(entryId),

    // Actions and CRUD
    loadEntries: () => journalStore.loadEntries(),
    
    createEntry: (payloadEntry) => journalStore.createEntry(payloadEntry),
    updateEntry: (payloadEntry) => journalStore.updateEntry(payloadEntry),
    destroyEntry: (payloadEntry) => journalStore.destroyEntry(payloadEntry)
  }
}