import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { accomodationAll } from './accomodation';
import { getMeals } from './food';
import { workshopsAll } from './workshops';
import { aggregateOrderData } from '../transformers/orders';

const getParticipantDetailsState = state => state.participant.details;
const getParticipantOrdersState = state => state.participant.orders;

export const shouldFetchParticipant = createSelector(
  getParticipantDetailsState,
  isStateValid
);

export const shouldFetchParticipantOrders = createSelector(
  getParticipantOrdersState,
  isStateValid
);

export const getParticipant = createSelector(
  getParticipantDetailsState,
  state => state.data
);

export const getParticipantOrders = createSelector(
  getParticipantOrdersState,
  state => state.data
);

const sortOrders = orders => orders
  .slice(0)
  .sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    return 0;
  });

export const getParticipantLatestOrder = createSelector(
  [
    getParticipantOrders,
    workshopsAll,
    getMeals,
    accomodationAll,
  ],
  (orders, workshops, meals, accomodationList) => {
    const sortedOrders = sortOrders(orders.filter(order => !order.canceled));
    return sortedOrders.length > 0 ?
      aggregateOrderData(workshops, meals, accomodationList)(sortedOrders[0]) :
      null;
  }
);

export const getParticipantUnconfirmedOrder = createSelector(
  [
    getParticipantOrders,
    workshopsAll,
    getMeals,
    accomodationAll,
  ],
  (orders, workshops, meals, accomodationList) => {
    const unconfirmedOrders = sortOrders(orders.filter(
      order => !order.confirmed && !order.paid && !order.canceled
    ));
    return unconfirmedOrders.length > 0 ?
      aggregateOrderData(workshops, meals, accomodationList)(unconfirmedOrders[0]) :
      null;
  }
);
