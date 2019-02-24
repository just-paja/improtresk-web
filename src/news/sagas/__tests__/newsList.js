import sinon from 'sinon'

import { newsListFetch } from '../../actions'

import sagas from '..'
import getSagaTester from '../../../../mock/sagaTester'

describe('newsList saga', () => {
  beforeEach(() => {
    sinon.stub(newsListFetch, 'resource')
  })

  afterEach(() => {
    newsListFetch.resource.restore()
  })

  it('fetches news from API', () => {
    const sagaTester = getSagaTester()
    sagaTester.runAll(sagas)
    sagaTester.dispatch(newsListFetch())
    expect(newsListFetch.resource.calledOnce).toBeTruthy()
  })
})
