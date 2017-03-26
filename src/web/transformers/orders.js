export const aggregateOrderAccomodationData = (reservation, accomodationList) => {
  if (!reservation || !reservation.accomodation) {
    return null;
  }
  return accomodationList.find(
    a => a.id === reservation.accomodation
  ) || null;
};

export const aggregateOrderMealsData = (reservation, meals) => {
  if (!reservation || !reservation.mealReservation) {
    return [];
  }
  return reservation.mealReservation.reduce((accumulator, current) => {
    const meal = meals.find(m => m.id === current.id);
    return meal ? accumulator.concat([meal]) : accumulator;
  }, []);
};

export const aggregateOrderWorkshopData = (reservation, workshops) => {
  if (!reservation || !reservation.workshopPrice || !reservation.workshopPrice.workshop) {
    return null;
  }

  return workshops.find(ws => ws.id === reservation.workshopPrice.workshop) || null;
};

export const aggregateOrderData = (workshops, meals, accomodationList) => order => ({
  ...order,
  accomodation: aggregateOrderAccomodationData(order.reservation, accomodationList),
  endsAt: order.reservation ? order.reservation.endsAt : null,
  meals: aggregateOrderMealsData(order.reservation, meals),
  workshop: aggregateOrderWorkshopData(order.reservation, workshops),
});
