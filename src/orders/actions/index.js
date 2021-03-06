import * as api from '../../api'
import * as constants from '../constants'

import {
  createCollectionRoutine,
  createFormRoutine,
  createRoutine
} from '../../routines'

export const requireOrderResources = () => ({
  type: constants.ORDER_RESOURCES_REQUIRED
})

export const foodChange = createFormRoutine(constants.ORDER_FOOD_FORM_CHANGE, api.orderChangeFood)
export const orderCancel = createRoutine(constants.ORDER_CANCEL, api.orderCancel)
export const orderConfirm = createRoutine(constants.ORDER_CONFIRM, api.orderConfirm)
export const orderCreate = createFormRoutine(constants.FORM_ORDER, api.orderCreate)
export const orderChange = createFormRoutine(constants.ORDER_CHANGE, api.orderChange)
export const orderListFetch = createCollectionRoutine(
  constants.ORDER_LIST_FETCH,
  api.fetchParticipantOrders
)
