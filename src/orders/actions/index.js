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
