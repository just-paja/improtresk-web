import sinon from 'sinon'

import { roomListFetch } from '../../actions'

import sagas from '..'
import getSagaTester from '../../../../mock/sagaTester'

describe('newsList saga', () => {
  beforeEach(() => {
    sinon.stub(roomListFetch, 'resource')
  })

  afterEach(() => {
    roomListFetch.resource.restore()
  })

  it('fetches rooms from API', () => {
    const sagaTester = getSagaTester({
      orders: {
        list: {
          data: [
            {
              id: 10,
              confirmed: true,
              year: 1
            }
          ]
        }
      },
      years: {
        list: {
          data: [
            {
              id: 1,
              current: true
            }
          ]
        }
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(roomListFetch())
    expect(roomListFetch.resource.calledOnce).toBeTruthy()
  })
})
