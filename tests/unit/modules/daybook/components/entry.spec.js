import { describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry.vue'
import { journalMockState } from '../../../mock-data/test-journal-state'

describe('Provas no Entry Component', () => {

  const mockRouter = {
    push: vi.fn()
  }

  const wrapper = shallowMount(Entry, {
    props: { entry: journalMockState.entries[0] },
    global: {
      mocks: {
        $router: mockRouter
      }
    }
  })

  test('deve fazer match com o snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('deve redirecionar ao clicar para entry-container', () => {
    const entryContainer = wrapper.find('.entry-container')
    entryContainer.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry', 
      params: {
        id: journalMockState.entries[0].id
      }
    })
  })

  test('provas nas propriedades computadas', () => {
    expect(wrapper.vm.entryDay).toBe(6)
    expect(wrapper.vm.entryMonth).toBe('novembro')
    expect(wrapper.vm.entryYear).toBe('2022, domingo')
  })

})
