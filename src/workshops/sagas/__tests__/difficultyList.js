import sinon from 'sinon'

import * as api from '../../../api'

import getSagaTester from '../../../../mock/sagaTester'
import sagas from '..'

describe('Workshop Difficulty List sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key))
  })

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore())
  })

  it('fetch difficulty list from API', () => {
    const sagaTester = getSagaTester({})
    api.fetchWorkshopDifficulties.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 3,
          name: 'Pro pokročilé'
        }
      ])
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch({ type: 'WORKSHOP_DIFFICULTIES_REQUIRED' })
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOP_DIFFICULTIES_FETCH_STARTED'
    }))
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'WORKSHOP_DIFFICULTIES_FETCH_SUCCESS'
    }))
    expect(api.fetchWorkshopDifficulties.calledOnce).toBeTruthy()
    expect(sagaTester.getState().workshops.difficulties.data).toMatchObject([
      {
        id: 3,
        name: 'Pro pokročilé'
      }
    ])
  })
})
