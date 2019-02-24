import sinon from 'sinon'

import * as api from '../../../api'

import getSagaTester from '../../../../mock/sagaTester'
import sagas from '..'

describe('Location List sagas', () => {
  beforeEach(() => {
    Object.keys(api).forEach(key => sinon.stub(api, key))
  })

  afterEach(() => {
    Object.keys(api).forEach(key => api[key].restore())
  })

  it('fetch locations from API', () => {
    const sagaTester = getSagaTester({
      locations: {
        list: {}
      },
      years: {
        list: {
          data: [
            {
              id: 15,
              year: '2018'
            }
          ]
        }
      }
    })
    api.fetchLocations.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 5,
          address: 'foo'
        }
      ])
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch({ type: 'LOCATIONS_REQUIRED' })
    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'LOCATIONS_FETCH_STARTED'
    }))

    expect(sagaTester.getCalledActions()).toContainEqual(expect.objectContaining({
      type: 'LOCATIONS_FETCH_SUCCESS'
    }))
    expect(sagaTester.getState().locations.list.data).toEqual([
      {
        id: 5,
        address: 'foo'
      }
    ])
  })

  it('does not fetch locations when no year is loaded', () => {
    const sagaTester = getSagaTester({
      locations: {
        list: {}
      },
      years: {
        list: {
          data: []
        }
      }
    })
    api.fetchLocations.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 5,
          address: 'foo'
        }
      ])
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch({ type: 'LOCATIONS_REQUIRED' })
    expect(sagaTester.getCalledActions()).not.toContainEqual(expect.objectContaining({
      type: 'LOCATIONS_FETCH_STARTED'
    }))
  })
})
