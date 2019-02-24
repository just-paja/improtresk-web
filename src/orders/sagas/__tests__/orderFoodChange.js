import sinon from 'sinon'

import { initialize } from 'redux-form'

import { foodChange } from '../../actions'

import getSagaTester from '../../../../mock/sagaTester'
import sagas from '..'

describe('orderFoodChange saga', () => {
  beforeEach(() => {
    sinon.stub(foodChange, 'resource')
  })

  afterEach(() => {
    foodChange.resource.restore()
  })

  it('calls order food change API', () => {
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
    foodChange.resource.returns({
      status: 204,
      ok: true
    })
    sagaTester.dispatch(initialize('ORDER_FOOD_FORM_CHANGE', {
    }))
    sagaTester.runAll(sagas)
    sagaTester.dispatch(foodChange())
    expect(sagaTester.numCalled(foodChange.REQUEST)).toBe(1)
    expect(sagaTester.numCalled(foodChange.SUCCESS)).toBe(1)
    expect(foodChange.resource.getCall(0).args).toContainEqual(expect.objectContaining({
      order: 300,
      year: 8,
      formData: {}
    }))
  })
})
