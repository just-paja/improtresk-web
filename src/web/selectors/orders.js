import moment from 'moment';

import { createSelector } from 'reselect';

import { getForm } from './forms';
import { getParticipantLatestOrder } from './participant';
import { workshopsAll } from './workshops';
import { getMeals } from './food';

const getOrderForm = state => getForm(state, 'order').values;

const getWorkshopPrice = (prices) => {
  const filteredPrices = prices
    .filter((price) => {
      const now = moment();
      return (!price.endsOn || now.isBefore(price.endsOn)) &&
        now.isAfter(price.takesEffectOn);
    })
    .sort();

  return filteredPrices[0] || null;
};

const calculatePrice = (values, workshops, meals) => {
  let price = 0;

  if (values.workshop) {
    const workshopEntry = workshops.find(ws => ws.id === values.workshop);

    if (workshopEntry) {
      const workshopPrice = getWorkshopPrice(workshopEntry.prices);
      if (workshopPrice) {
        price += workshopPrice.price;
      }
    }
  }

  if (values.meals && values.meals.length) {
    price += values.meals.reduce((accumulator, current) => {
      const meal = meals.find(m => m.id === current);
      return meal ? accumulator + meal.price : accumulator;
    }, 0);
  }

  return price;
};

export const getOrderFormPrice = createSelector(
  [getOrderForm, workshopsAll, getMeals],
  calculatePrice
);

export const getOrderedMeals = createSelector(
  [getParticipantLatestOrder, getMeals],
  (order, meals) => {
    if (!order || !order.reservation) {
      return [];
    }
    return order.reservation.mealReservation.map((mealReservation) => {
      const meal = meals.find(item => item.id === mealReservation.meal);

      if (meal) {
        const food = meal.foods.find(item => item.id === mealReservation.food);
        const soup = meal.soups.find(item => item.id === mealReservation.soup);
      }

      return null;
    });
  }
);
