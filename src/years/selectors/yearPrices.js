import moment from 'moment-timezone';

import { createSelector } from 'reselect';

import { yearActive } from './yearList';

export const getPriceLevels = createSelector(
  yearActive,
  year => (year && year.priceLevels ? year.priceLevels
    .slice()
    .sort((a, b) => {
      if (a.takesEffectOn > b.takesEffectOn) {
        return -1;
      }
      if (a.takesEffectOn < b.takesEffectOn) {
        return 1;
      }
      return 0;
    })
    .reduce((priceLevels, priceLevel) => [
      ...priceLevels,
      {
        ...priceLevel,
        endsOn: priceLevels[priceLevels.length - 1] ?
          priceLevels[priceLevels.length - 1].takesEffectOn : null,
      },
    ], [])
    .reverse() : [])
);

export const getActivePriceLevels = createSelector(
  getPriceLevels,
  (priceLevels) => {
    const now = moment();
    return priceLevels.filter(price =>
      (!price.endsOn || now.isBefore(price.endsOn)) &&
      !now.isBefore(price.takesEffectOn)
    );
  }
);

export const getActivePriceLevel = createSelector(
  getActivePriceLevels,
  priceLevels => priceLevels[0] || null
);
