import fetchOrderResources from './fetchOrderResources';
import fetchOrders from './fetchOrders';
import orderCancel from './orderCancel';
import orderConfirm from './orderConfirm';
import orderCreate from './orderCreate';
import orderOperations from './orderOperations';

export * from './orderOperations';

export default [
  ...fetchOrderResources,
  ...fetchOrders,
  ...orderCancel,
  ...orderConfirm,
  ...orderCreate,
  ...orderOperations,
];
