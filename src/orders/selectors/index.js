import moment from 'moment';

import { createSelector } from 'reselect';
import { isRequired, getProgress, transformData } from 'react-saga-rest';

import { getForm } from '../../forms/selectors';
import { getAccomodationList, getAccomodationListState } from '../../accomodation/selectors';
import { getMealList, getMealListState } from '../../food/selectors';
import {
  getWorkshopList,
  getWorkshopListState,
  getLectorListState,
  getLectorRolesState,
} from '../../workshops/selectors';

export const getOrderListState = state => state.orders.list;

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

export const aggregateAccomodation = (item, accomodationList) => {
  let accomodation = null;
  if (item && item.accomodation) {
    accomodation = accomodationList.find(
      a => a.id === item.accomodation
    ) || null;
  }
  return ({ ...item, accomodation });
};

export const aggregateMeals = (item, mealMenu) => {
  let meals = [];
  if (item && item.mealReservation) {
    meals = item.mealReservation.reduce((accumulator, current) => {
      const meal = mealMenu.find(m => m.id === current.id);
      return meal ? accumulator.concat([meal]) : accumulator;
    }, []);
  }
  return ({ ...item, meals });
};

export const aggregateWorkshop = (item, workshops) => {
  let workshop = null;
  if (item && item.workshopPrice && item.workshopPrice.workshop) {
    workshop = workshops.find(ws => ws.id === item.workshopPrice.workshop) || null;
  }
  return ({ ...item, workshop });
};

export const isOrderListRequired = isRequired(getOrderListState);

export const getOrderList = transformData(getOrderListState, {
  sort: sortOrders,
  transformers: [
    {
      select: getWorkshopList,
      transform: aggregateWorkshop,
    },
    {
      select: getMealList,
      transform: aggregateMeals,
    },
    {
      select: getAccomodationList,
      transform: aggregateAccomodation,
    },
  ],
});

export const getOrderListProgress = getProgress(getOrderListState);

export const getLatestOrder = createSelector(
  getOrderList,
  orders => orders[0] || null
);

export const getActiveOrder = createSelector(
  getOrderList,
  orders => orders[0] || null
);

export const getUnconfirmedOrder = createSelector(
  getOrderList,
  orders => orders.find(
    order => !order.confirmed && !order.paid && !order.canceled
  ) || null
);

export const getOrderForm = getForm('order');

export const getOrderFormProgress = getProgress(
  getAccomodationListState,
  getMealListState,
  getWorkshopListState,
  getLectorListState,
  getLectorRolesState
);

const getWorkshopPrice = (prices) => {
  const filteredPrices = prices
    .filter((price) => {
      const now = moment();
      return (!price.endsOn || now.isBefore(price.endsOn)) &&
        !now.isBefore(price.takesEffectOn);
    })
    .sort();
  return filteredPrices[0] || null;
};

const calculatePrice = (form, workshops, meals) => {
  let price = 0;

  if (form.values.workshop) {
    const workshopEntry = workshops.find(ws => ws.id === form.values.workshop);

    if (workshopEntry) {
      const workshopPrice = getWorkshopPrice(workshopEntry.prices);
      if (workshopPrice) {
        price += workshopPrice.price;
      }
    }
  }

  if (form.values.meals && form.values.meals.length) {
    price += form.values.meals.reduce((accumulator, current) => {
      const meal = meals.find(m => m.id === current);
      return meal ? accumulator + meal.price : accumulator;
    }, 0);
  }

  return price;
};

export const getOrderFormPrice = createSelector(
  [getOrderForm, getWorkshopList, getMealList],
  calculatePrice
);

export const getOrderedMeals = createSelector(
  [getLatestOrder, getMealList],
  (order, meals) => {
    if (!order || !order.reservation) {
      return [];
    }
    return order.reservation.mealReservation
      .map((mealReservation) => {
        const meal = meals.find(item => item.id === mealReservation.meal);

        if (meal) {
          return {
            ...meal,
            orderedFood: meal.food.find(item => item.id === mealReservation.food),
            orderedSoup: meal.soups.find(item => item.id === mealReservation.soup),
          };
        }

        return null;
      })
      .filter(meal => meal);
  }
);
