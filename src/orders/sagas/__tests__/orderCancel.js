import sinon from 'sinon'

import { orderCancel } from '../../actions'

import getSagaTester from '../../../../mock/sagaTester'
import sagas from '..'

describe('orderCancel saga', () => {
  beforeEach(() => {
    sinon.stub(orderCancel, 'resource')
  })

  afterEach(() => {
    orderCancel.resource.restore()
  })

  it('calls order cancel API', () => {
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
    orderCancel.resource.returns({
      status: 204,
      ok: true
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(orderCancel())
    expect(sagaTester.numCalled(orderCancel.REQUEST)).toBe(1)
    expect(sagaTester.numCalled(orderCancel.SUCCESS)).toBe(1)
    expect(orderCancel.resource.calledOnce).toBeTruthy()
    expect(orderCancel.resource.getCall(0).args).toContainEqual(expect.objectContaining({
      order: 300
    }))
  })
})
