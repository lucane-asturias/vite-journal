import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from "vitest";
import About from '@/views/About.vue'

describe('Provas no About View', () => {
  test('deve renderizar o componente corretamente', () => {
    const wrapper = shallowMount(About)
    expect(wrapper.html()).toMatchSnapshot()
  })
})