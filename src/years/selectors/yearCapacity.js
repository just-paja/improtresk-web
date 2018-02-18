import { createSelector } from 'reselect';

import { getData, transformData } from 'react-saga-rest';

export const aggregateCapacityData = (objectId, capacity) => {
  if (capacity) {
    const entry = capacity.find(cap => cap.id === objectId);

    if (entry) {
      const freeSpots = Math.max(0, (
        entry.capacity -
        entry.number_of_reservations -
        entry.number_of_unpaid_reservations
      ));

      return {
        capacity: entry.capacity,
        assigned: entry.number_of_reservations,
        reserved: entry.number_of_unpaid_reservations,
        fullyAssigned: entry.number_of_reservations >= entry.capacity,
        fullyReserved:
          entry.number_of_reservations < entry.capacity &&
          freeSpots === 0,
        freeSpots,
      };
    }
  }

  return null;
};

export const getCapacityState = state => state.years.capacity;

export const isPolling = createSelector(
  getCapacityState,
  capacity => capacity.polling
);

export const getCapacity = getData(getCapacityState);

export const getAccomodationCapacity = transformData(getCapacityState, [
  capacity => (capacity && capacity.accomodation ? capacity.accomodation : []),
]);

export const getWorkshopCapacity = transformData(getCapacityState, [
  capacity => (capacity && capacity.workshops ? capacity.workshops : []),
]);
