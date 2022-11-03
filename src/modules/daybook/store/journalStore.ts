import { defineStore } from 'pinia'

export const useJournalStore = defineStore('journalStore', {
  state: () => ({
    isLoading: true,
    entries: [
      {
        id: new Date().getTime(),
        date: new Date().toDateString(),
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        picture: null
      }
    ]
  }),
  actions: {
    loadEntries(payloadEntries) {
      //
    },
    updateEntry(payloadEntry) {
      //
    },
    createEntry(payloadEntry) {
      //
    }
  },
  getters: {
    getEntriesByTerm: (state) => {
      return (term: string): object => {
        if (term.length === 0) return state.entries

        return state.entries.filter(
          entry => entry.text.toLowerCase().includes(term.toLowerCase())
        )
      }
    }, 
    getEntriesById: (state) => {
      return (entryId: string): object => {
        const entryObj = state.entries.find(entry => entry.id === entryId)
        if (!entryObj) return

        return { ...entryObj }
      } 
    } 
  }
})