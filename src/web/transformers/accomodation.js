import { aggregateCapacityData } from './capacity';

// eslint-disable-next-line import/prefer-default-export
export const aggregateAccomodationData = capacity => accomodation => (
  accomodation ? ({
    ...accomodation,
    capacityStatus: aggregateCapacityData(accomodation.id, capacity) || {},
  }) : null
);
