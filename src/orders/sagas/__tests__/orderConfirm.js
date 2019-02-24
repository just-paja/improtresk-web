import sinon from 'sinon'

import { orderConfirm } from '../../actions'

import getSagaTester from '../../../../mock/sagaTester'
import sagas from '..'

describe('orderConfirm saga', () => {
  beforeEach(() => {
    sinon.stub(orderConfirm, 'resource')
  })

  afterEach(() => {
    orderConfirm.resource.restore()
  })

  it('calls order confirm API', () => {
    const sagaTester = getSagaTester({
      orders: {
        list: {
          data: [
            {
              id: 300,
              reservation: {},
              year: 8
            }
          ]
        }
      },
      years: {
        list: {
          data: [
            {
              id: 8,
              year: 2018
            }
          ]
        }
      }
    })
    orderConfirm.resource.returns({
      status: 204,
      ok: true
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(orderConfirm())
    expect(sagaTester.numCalled(orderConfirm.REQUEST)).toBe(1)
    expect(sagaTester.numCalled(orderConfirm.SUCCESS)).toBe(1)
    expect(orderConfirm.resource.calledOnce).toBeTruthy()
    expect(orderConfirm.resource.getCall(0).args).toContainEqual(expect.objectContaining({
      order: 300
    }))
  })
})
