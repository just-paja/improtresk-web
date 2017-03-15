import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { getMeals } from './food';
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

const mapOrderMeals = (reservation, meals) => {
  if (!reservation || !reservation.mealReservation) {
    return [];
  }
  return reservation.mealReservation.reduce((accumulator, current) => {
    const meal = meals.find(m => m.id === current.id);
    return meal ? accumulator.concat([meal]) : accumulator;
  }, []);
};

const mapOrderWorkshop = (reservation, workshops) => {
  if (!reservation || !reservation.workshopPrice || !reservation.workshopPrice.workshop) {
    return null;
  }

  const workshop = workshops.find(ws => ws.id === reservation.workshopPrice.workshop);
  return workshop;
};

export const mapOrders = (workshops, meals) => order => ({
  ...order,
  endsAt: order.reservation ? order.reservation.endsAt : null,
  meals: mapOrderMeals(order.reservation, meals),
  workshop: mapOrderWorkshop(order.reservation, workshops),
});

const sortOrders = orders => orders
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

export const getParticipantLatestOrder = createSelector(
  [
    getParticipantOrders,
    workshopsAll,
    getMeals,
  ],
  (orders, workshops, meals) => {
    const sortedOrders = sortOrders(orders);
    return sortedOrders.length > 0 ?
      mapOrders(workshops, meals)(sortedOrders[0]) :
      null;
  }
);

export const getParticipantUnconfirmedOrder = createSelector(
  [
    getParticipantOrders,
    workshopsAll,
    getMeals,
  ],
  (orders, workshops, meals) => {
    const unconfirmedOrders = sortOrders(orders.filter(order => !order.confirmed));
    return unconfirmedOrders.length > 0 ?
      mapOrders(workshops, meals)(unconfirmedOrders[0]) :
      null;
  }
);
