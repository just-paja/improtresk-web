import * as constants from '../constants';

export const requireAccomodationList = () => ({
  type: constants.ACCOMODATION_REQUIRED,
});

export const accomodationListLeft = () => ({
  type: constants.ACCOMODATION_LEFT,
});
