import sinon from 'sinon'

import { performerListFetch } from '../../actions'

import getSagaTester from '../../../../mock/sagaTester'
import sagas from '..'

describe('fetchPerformerList saga', () => {
  beforeEach(() => {
    sinon.stub(performerListFetch, 'resource')
  })

  afterEach(() => {
    performerListFetch.resource.restore()
  })

  it('fetches performer list', () => {
    const sagaTester = getSagaTester()
    performerListFetch.resource.returns({
      ok: true,
      status: 200,
      json: () => ([
        {
          id: 40,
          name: 'Foo'
        }
      ])
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(performerListFetch())
    expect(sagaTester.numCalled(performerListFetch.REQUEST)).toBe(1)
    expect(sagaTester.getState().performers.list.data).toEqual([
      {
        id: 40,
        name: 'Foo'
      }
    ])
  })
})
