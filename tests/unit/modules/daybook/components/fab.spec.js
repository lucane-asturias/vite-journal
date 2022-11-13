import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from "vitest";
import Fab from '@/modules/daybook/components/Fab.vue'

describe('Provas no componente FAB', () => {
  test('deve mostrar o icone by default', () => {
   const wrapper = shallowMount(Fab)
   const iTag = wrapper.find('i')

   expect(iTag.classes('fa-plus')).toBeTruthy() 
  })

  test('deve mostrar o icone por argumento: fa-circle', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle'
      }
    })
    const iTag = wrapper.find('i')

   expect(iTag.classes('fa-circle')).toBeTruthy() 
  })

  test('deve emitir o evento click quando clicar', () => {
    const wrapper = shallowMount(Fab)
       
    wrapper.find('button').trigger('click')
   
    expect(wrapper.emitted('on:click')).toHaveLength(1)
  })
})