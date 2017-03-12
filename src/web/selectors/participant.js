import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { workshopsAll } from './workshops';

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

const mapOrderWorkshop = (reservation, workshops) => {
  if (!reservation || !reservation.workshopPrice || !reservation.workshopPrice.workshop) {
    return null;
  }

  const workshop = workshops.find(ws => ws.id === reservation.workshopPrice.workshop);
  return workshop;
};

const mapOrders = workshops => order => ({
  ...order,
  endsAt: order.reservation ? order.reservation.endsAt : null,
  workshop: mapOrderWorkshop(order.reservation, workshops),
});

export const getParticipantLatestOrder = createSelector(
  [
    getParticipantOrders,
    workshopsAll,
  ],
  (orders, workshops) => {
    const sortedOrders = orders
      .slice(0)
      .sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        return 0;
      });

    return sortedOrders.length > 0 ?
      mapOrders(workshops)(sortedOrders[0]) :
      null;
  }
);
