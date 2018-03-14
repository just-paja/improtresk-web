import * as constants from '../constants';

export const requireOrderResources = () => ({
  type: constants.ORDER_RESOURCES_REQUIRED,
});

export const requireOrderList = () => ({
  type: constants.ORDERS_REQUIRED,
});

export const confirmOrder = () => ({
  type: constants.ORDER_CONFIRM_REQUESTED,
});

export const cancelOrder = () => ({
  type: constants.ORDER_CANCEL_REQUESTED,
});

export const invalidateOrders = () => ({
  type: constants.ORDERS_INVALIDATE,
});

export const setOrderDefaults = () => ({
  type: constants.ORDER_FORM_SET_DEFAULTS,
});
