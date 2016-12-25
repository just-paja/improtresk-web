import { createSelector } from 'reselect';

const getAccomodationState = state => state.accomodation;

export const accomodationAll =
  createSelector(getAccomodationState, accomodation => accomodation.data);

export default { accomodationAll };
