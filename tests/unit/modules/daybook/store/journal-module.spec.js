import { beforeEach, describe, expect, test, vi } from "vitest"
import { createPinia, setActivePinia, storeToRefs } from 'pinia'

import { shallowMount } from '@vue/test-utils'

import { useJournalStore } from '@/modules/daybook/store/journalStore'
import { journalMockState } from '../../../mock-data/test-journal-state'


describe('Pinia - Tests in the Journal Module Store', () => {
  let journalStore
  // SETUP - run prior to each unit test
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())

    // create an instance of the journal store
    journalStore = useJournalStore()

    // initial state
    journalStore.isLoading = journalMockState.isLoading
    journalStore.entries = journalMockState.entries
  })


  // Basicas ==================
  test('this is the initial state, should\'ve this state', () => {      
    expect(journalStore.isLoading).toBeFalsy()
    expect(journalStore.entries).toEqual(journalMockState.entries)
  })

  // Mutations ==================

  test('mutation: setEntries', async () => {
    await journalStore.loadEntries()
    // it depends on the quantities of entries in firebase
    expect(journalStore.entries.length).toBe(7)
  })

  test('mutation: updateEntry', async () => {
    const updatedEntryObj = {
      id: '-NGEEMchN3whr9JV4rDE',
      date : 1667779469934,
      text : 'Hola mundo desde pruebas xD',
      picture : null,
      otroCampo: true, // ignorable
      otroMas: { a: 1} // ignorable
    }

    await journalStore.updateEntry(updatedEntryObj)

    const stateEntries = journalStore.entries

    expect(stateEntries.length).toBe(2)
    expect(stateEntries.find(
      e => e.id === updatedEntryObj.id 
    )).toEqual({
      id: '-NGEEMchN3whr9JV4rDE',
      date : 1667779469934,
      text : 'Hola mundo desde pruebas xD',
      picture : null
    })
  })

  test('mutation: createEntry destroyEntry', async () => {
    // Create Entry -------------------------------
    const newEntry = 
      { date: 1627077227978, text: 'New entry from las pruebas' }

    const id = await journalStore.createEntry(newEntry)

    expect(id.length).toBe(20)
    expect(typeof id).toBe('string')

    const stateEntries = journalStore.entries

    expect(stateEntries.length).toBe(3)
    expect(stateEntries.find(entry => entry.id === id)).toBeTruthy()

    // Delete Entry -------------------------------
    await journalStore.destroyEntry(id)
      
    expect(journalStore.entries.find(e => e.id === id)).toBeFalsy()
    expect(journalStore.entries.length).toBe(2)
  })  

  // Getters ==================

  test('getters: getEntriesByTerm getEntryById', () => {
    const entries = journalStore.entries
    
    // getEntriesByTerm -----------------------------
    expect(journalStore.getEntriesByTerm('').length).toBe(2)
    expect(journalStore.getEntriesByTerm('segunda').length).toBe(1)
    expect(journalStore.getEntriesByTerm('segunda')).toEqual([entries[1]])

    // getEntriesById -------------------------------
    expect(journalStore.getEntriesById('-NGEEMchN3whr9JV4rDE')).toMatchObject(entries[0])
  })
    
})