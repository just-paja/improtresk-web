import sinon from 'sinon'

import * as api from '../../../api'

import getSagaTester from '../../../../mock/sagaTester'
import sagas from '..'

describe('Conditions sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key))
  })

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore())
  })

  it('fetch rules from API', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 3,
              year: '2018',
              current: true
            }
          ]
        }
      }
    })
    api.fetchRules.returns({
      ok: true,
      status: 200,
      json: () => ({
        id: 203,
        text: 'asdf'
      })
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch({ type: 'YEAR_RULES_REQUIRED' })
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_RULES_FETCH_START'
    }))
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'YEAR_RULES_FETCH_SUCCESS'
    }))
    expect(sagaTester.getState().years.rules.data).toEqual({
      id: 203,
      text: 'asdf'
    })
  })

  it('do not fetch rules when there is year loaded', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: []
        }
      }
    })
    api.fetchRules.returns({
      ok: true,
      status: 200,
      json: () => ({
        id: 203,
        text: 'asdf'
      })
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch({ type: 'YEAR_RULES_REQUIRED' })
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'YEAR_RULES_FETCH_START'
    }))
  })
})
