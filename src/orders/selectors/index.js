import moment from 'moment-timezone';

import { createSelector } from 'reselect';
import { isRequired, getProgress, transformData } from 'react-saga-rest';
import { getFormValues } from 'redux-form';

import * as constants from '../constants';

import { getAccomodationList, getCheapestAccomodation, getAccomodationListState } from '../../accomodation/selectors';
import { getMealList, getMealListState } from '../../food/selectors';
import { yearsAll, yearActive, getActivePriceLevel } from '../../years/selectors';
import { getParticipantDetail } from '../../participants/selectors';
import {
  getWorkshopList,
  getWorkshopListState,
  getLectorListState,
  getLectorRolesState,
} from '../../workshops/selectors';

export const getOrderListState = state => state.orders.list;

const sortOrders = (a, b) => {
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  return 0;
};

export const aggregateAccomodation = (item, accomodationList) => {
  let accomodation = null;
  if (item && item.reservation && item.reservation.accomodation) {
    accomodation = accomodationList.find(
      a => a.id === item.reservation.accomodation
    ) || null;
  }
  return ({ ...item, accomodation });
};

export const aggregateMeals = (item, mealMenu) => {
  let meals = [];
  if (item && item.reservation && item.reservation.mealReservation) {
    meals = item.reservation.mealReservation.reduce((accumulator, current) => {
      const meal = mealMenu.find(m => m.id === current.meal);
      if (meal) {
        return [
          ...accumulator,
          {
            ...meal,
            orderedFood: meal.food && meal.food.find(food => current.food === food.id),
            orderedSoup: meal.soups && meal.soups.find(soup => current.soup === soup.id),
          },
        ];
      }
      return accumulator;
    }, []);
  }
  return ({ ...item, meals });
};

export const aggregateWorkshop = (item, workshops) => {
  let workshop = null;
  if (
    item &&
    item.reservation &&
    item.reservation.workshopPrice &&
    item.reservation.workshopPrice.workshop
  ) {
    workshop = workshops.find(ws => ws.id === item.reservation.workshopPrice.workshop) || null;
  }
  return ({ ...item, workshop });
};

export const aggregateAssignment = (item, participant) => {
  let assigned = false;
  if (
    item &&
    item.reservation &&
    item.reservation.workshopPrice &&
    item.reservation.workshopPrice.workshop &&
    participant &&
    participant.assignments
  ) {
    assigned = participant.assignments.indexOf(item.reservation.workshopPrice.workshop) !== -1;
  }
  return ({ ...item, assigned });
};

export const aggregateYear = (item, years) => {
  let year = null;
  if (item && item.year) {
    year = years.find(yearItem => yearItem.id === item.year) || null;
  }
  return ({ ...item, year });
};

export const aggregateRemainingPrice = (item) => {
  let remainingPrice = item.price;
  if (item && item.payments) {
    const paid = item.payments.reduce(
      (price, payment) => price + parseFloat(payment.amount, 10), 0
    );
    remainingPrice = item.price - paid;
  }
  return ({ ...item, remainingPrice });
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
    {
      select: yearsAll,
      transform: aggregateYear,
    },
    {
      select: getParticipantDetail,
      transform: aggregateAssignment,
    },
    {
      transform: aggregateRemainingPrice,
    },
  ],
});

export const getOrderListProgress = getProgress(getOrderListState);

export const getActiveOrder = createSelector(
  [getOrderList, yearActive],
  (orders, year) => {
    if (year) {
      const filtered = orders.filter(order => (
        !order.cancelled &&
        order.year &&
        order.year.id === year.id
      ));
      return filtered[0] || null;
    }
    return null;
  }
);

export const getUnconfirmedOrder = createSelector(
  getOrderList,
  orders => orders.find(
    order => !order.confirmed && !order.paid && !order.cancelled
  ) || null
);

const getOrderForm = getFormValues(constants.FORM_ORDER);

export const getOrderFormProgress = getProgress(
  getAccomodationListState,
  getMealListState,
  getOrderListState,
  getWorkshopListState,
  getLectorListState,
  getLectorRolesState
);

const getWorkshopPrice = (prices) => {
  const now = moment();
  const filteredPrices = prices
    .filter(price => (
      (!price.endsOn || now.isBefore(price.endsOn)) &&
      !now.isBefore(price.takesEffectOn)
    ))
    .sort();
  return filteredPrices[0] || null;
};

const calculatePrice = (form, workshops, meals, priceLevel) => {
  let price = 0;
  if (!form) {
    return price;
  }
  if (form.workshop) {
    const workshopEntry = workshops.find(ws => ws.id === form.workshop);

    if (workshopEntry) {
      const workshopPrice = getWorkshopPrice(workshopEntry.prices);
      if (workshopPrice) {
        price += workshopPrice.price;
      }
    }
  } else if (priceLevel && form.stayLength) {
    price += form.stayLength.length * priceLevel.entryFee;
  }

  if (form.meals && form.meals instanceof Array && form.meals.length) {
    price += form.meals.reduce((accumulator, current) => {
      const meal = meals.find(m => m.id === current);
      return meal ? accumulator + meal.price : accumulator;
    }, 0);
  }

  return price;
};

export const getOrderFormPrice = createSelector(
  [getOrderForm, getWorkshopList, getMealList, getActivePriceLevel],
  calculatePrice
);

export const getOrderedMeals = createSelector(
  [getActiveOrder, getMealList],
  (order, meals) => {
    if (!order || !order.reservation || !order.reservation.mealReservation) {
      return [];
    }
    return order.reservation.mealReservation
      .map((mealReservation) => {
        const meal = meals.find(item => item.id === mealReservation.meal);

        if (meal) {
          return {
            ...meal,
            orderedFood: meal.food && meal.food.find(item => item.id === mealReservation.food),
            orderedSoup: meal.soups && meal.soups.find(item => item.id === mealReservation.soup),
          };
        }

        return null;
      })
      .filter(meal => meal);
  }
);

const getDates = (year) => {
  if (!year) {
    return [];
  }
  const current = moment(year.startDate);
  const end = moment(year.endDate);
  const dates = [];
  while (!current.isAfter(end)) {
    dates.push(current.format('YYYY-MM-DD'));
    current.add(1, 'days');
  }
  return dates;
};

export const getOrderFormDefaults = createSelector(
  [yearActive, getCheapestAccomodation],
  (year, accomodation) => ({
    accomodation: accomodation ? accomodation.id : null,
    meals: [],
    year: year.year,
    stayLength: getDates(year),
  })
);

export const getYearAndOrder = createSelector(
  [yearActive, getActiveOrder],
  (year, order) => ({
    year: year.id,
    order: order.id,
  })
);

export const getOrderFoodFormDefaults = createSelector(
  [getActiveOrder],
  order => ({
    food: order && order.reservation && order.reservation.mealReservation ?
      order.reservation.mealReservation.reduce((aggr, current) => ({
        ...aggr,
        [current.meal]: { food: current.food, soup: current.soup },
      }), {}) : {},
  })
);
