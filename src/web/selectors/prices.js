import { createSelector } from 'reselect';

import { yearActive } from './years';

export const getPriceLevels = createSelector(
  [yearActive],
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

export default { getPriceLevels };
