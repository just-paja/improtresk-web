import sinon from 'sinon'

import { accomodationListFetch } from '../../actions'

import getSagaTester from '../../../../mock/sagaTester'
import sagas from '..'

describe('Accomodation sagas', () => {
  beforeEach(() => {
    sinon.stub(accomodationListFetch, 'resource')
  })

  afterEach(() => {
    accomodationListFetch.resource.restore()
  })

  it('fetch accomodation from API', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 200,
              year: '2017',
              current: true
            }
          ]
        }
      }
    })
    accomodationListFetch.resource.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 20,
          name: 'DK Milevsko'
        }
      ])
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(accomodationListFetch())
    expect(sagaTester.numCalled(accomodationListFetch.REQUEST)).toBe(1)
    expect(sagaTester.numCalled(accomodationListFetch.SUCCESS)).toBe(1)
    expect(sagaTester.getState().accomodation.list.data).toEqual([
      {
        id: 20,
        name: 'DK Milevsko'
      }
    ])
  })

  it('dispatch capacity poll on accomodation required', () => {
    const sagaTester = getSagaTester({
      years: {
        list: {
          data: [
            {
              id: 200,
              year: '2017',
              current: true
            }
          ]
        }
      }
    })
    accomodationListFetch.resource.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 20,
          name: 'DK Milevsko'
        }
      ])
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(accomodationListFetch.subscribe())
    expect(sagaTester.numCalled('YEAR_CAPACITY_POLL_REQUIRED')).toBe(1)
  })

  it('dispatch capacity poll on accomdation exit', () => {
    const sagaTester = getSagaTester({})
    sagaTester.runAll(sagas)
    sagaTester.dispatch(accomodationListFetch.unsubscribe())
    expect(sagaTester.numCalled('YEAR_CAPACITY_POLL_STOP')).toBe(1)
  })
})
