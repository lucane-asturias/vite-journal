import { describe, expect, test } from "vitest"
import daybookRouter from '@/modules/daybook/router'

describe('Provas no modulo router de Daybook', () => {
  
  test('a rota deve ter esta configuracao abaixo', () => {
    expect(daybookRouter).toMatchObject({
      name: 'daybook',
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: 'no-entry',
          component: expect.any(Function),
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any(Function),
          props: expect.any(Function)
        }
      ]
    })
  })

  test('deve conter todos nomes dos componentes filhos', async () => {
    const componentConfig = Object.assign({}, await daybookRouter.children[0].component())
    expect((componentConfig.default.__name)).toBe('NoEntrySelected')

    const promiseRoutes = []
    const childrenRoutes = [ ...daybookRouter.children ] // remove referencia original
    childrenRoutes.forEach(child => promiseRoutes.push(child.component()))

    const routes = (await Promise.all(promiseRoutes)).map(route => route.default.__name)

    expect(routes).toContain('NoEntrySelected')
    expect(routes).toContain('EntryView')
  })

  test('deve retornar o id da rota', () => {
    const route = {
      params: {
        id: 'XYZ123'
      }
    }
    
    // expect(daybookRouter.children[1].props(route)).toEqual({ id: 'XYZ123' })
    const entryRoute = daybookRouter.children.find(route => route.name === 'entry')
    expect(entryRoute.props(route)).toEqual({ id: 'XYZ123' })
  })

})