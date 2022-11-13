import { beforeEach, describe, expect, test, vi } from "vitest";
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

import { useJournalStore } from '@/modules/daybook/store/journalStore'
import EntryList from '@/modules/daybook/components/EntryList.vue'

import { journalMockState } from '../../../mock-data/test-journal-state'


describe('Porvas no componente EntryList', () => {
  const mockRouter = { push: vi.fn() }

  let wrapper
  // SETUP - run prior to each unit test
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())

    wrapper = shallowMount(EntryList, {
      global: {
        mocks: { $router: mockRouter },
        plugins: [
          createTestingPinia({ 
            createSpy: vi.fn,
            initialState: {
              journalStore: { ...journalMockState }
            }
          })
        ]
      }
    })

    vi.clearAllMocks()
  })

  test('deve chamar getEntriesByTerm sem termo e mostrar 2 entradas', () => {
    expect( wrapper.findAll('entry-stub').length ).toBe(2)
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('deve chamar getEntriesByTerm e filtrar as entradas', async () => {
    const input = wrapper.find('input')
    await input.setValue('segunda')

    expect(wrapper.findAll('entry-stub').length).toBe(1)
  })
  
  test('o botão de nova entrada deve redirecionar a /new', () => {
    wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })
  })

})
