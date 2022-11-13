import { defineStore } from 'pinia'
import { journalApi } from '@/apis'

export type Entry = { id?: string, date: number, text: string, picture?: undefined | string }
type EntriesResponse = { date: number, text: string, picture?: null | string }

interface JournalState {
  entries: Entry[]
  isLoading: boolean
}

export const useJournalStore = defineStore('journalStore', {
  state: () => ({
    entries: [],
    isLoading: true
  }) as JournalState,
  actions: {
    async loadEntries() {
      const { data } = await journalApi.get<EntriesResponse>('/entries.json')

      if (!data) {
        this.entries = []
        this.isLoading = false
        return
      }

      const entries = []

      for (let id of Object.keys(data)) {
        entries.push({
          id,
          ...data[id]
        })
      }

      this.entries = [ ...this.entries, ...entries ]
      this.isLoading = false
    },
    async createEntry({ text, date, picture }: Entry) {
      const dataToSave = { text, date, picture }
      // const teste = '' // <<
      const { data } = await journalApi.post(`/entries.json`, dataToSave)

      Object.assign(dataToSave, { id: data.name })  // data = { "name": "-MxlYBvjVoYTMaMJG7mt" }
      
      this.entries = [ dataToSave, ...this.entries ]

      return data.name
    },
    async updateEntry({ id, text, date, picture }: Entry) {
      const dataToSave = { date, picture, text }

      const response = await journalApi.put(`/entries/${ id }.json`, dataToSave)
      Object.assign(dataToSave, { id }) // sending id for vitest purposes

      const idx = this.entries.map(e => e.id).indexOf(id)
      this.entries[idx] = dataToSave
    },
    async destroyEntry(payloadEntryId: string) {
      await journalApi.delete(`/entries/${ payloadEntryId }.json`)
      this.entries = this.entries.filter(entry => entry.id !== payloadEntryId)
    }
  },
  getters: {
    getEntriesByTerm: (state) => {
      return (term: string): object => {
        if (term?.length === 0) return state.entries

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