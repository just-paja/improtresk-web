import { createSelector } from 'reselect';

const getCapacityState = state => state.capacity;

export const isPolling = createSelector(
  getCapacityState,
  capacity => capacity.polling
);

export const getCapacity = createSelector(
  getCapacityState,
  capacity => capacity.data
);

export const getAccomodationCapacity = createSelector(
  getCapacityState,
  capacity => (capacity.data && capacity.data.accomodation ? capacity.data.accomodation : [])
);

export const getWorkshopCapacity = createSelector(
  getCapacityState,
  capacity => (capacity.data && capacity.data.workshops ? capacity.data.workshops : [])
);
