import { storeToRefs } from 'pinia'
import { useJournalStore } from '../store/journalStore'

export const useJournal = () => {
  const { getEntriesByTerm, getEntriesById } = storeToRefs(useJournalStore())

  return {
    // Getters
    getEntriesByTerm,
    getEntriesById
  }
}