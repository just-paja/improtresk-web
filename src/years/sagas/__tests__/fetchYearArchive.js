import sagas from '..'
import getSagaTester from '../../../../mock/sagaTester'

import api, { stubApiAndRecover } from '../../../../mock/stubApi'

import { yearDetailFetch } from '../../actions'

describe('fetchArchivedYear saga', () => {
  stubApiAndRecover()

  it('fetch year detail when required', () => {
    const sagaTester = getSagaTester({})
    api.fetchArchivedYear.returns({
      ok: true,
      status: 200,
      json: () => ({
        id: 5,
        year: '2018'
      })
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(yearDetailFetch('2018'))
    expect(sagaTester.numCalled(yearDetailFetch.REQUEST)).toBe(1)
    return sagaTester.waitFor(yearDetailFetch.FULFILL, () => {
      expect(sagaTester.numCalled(yearDetailFetch.SUCCESS)).toBe(1)
      expect(api.fetchArchivedYear.getCall(0).args).toContainEqual(expect.objectContaining({
        year: '2018'
      }))
      expect(sagaTester.getState().years.archive.data).toMatchObject({
        id: 5,
        year: '2018'
      })
    })
  })
})
