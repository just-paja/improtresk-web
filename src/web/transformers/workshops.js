import { aggregateLectorsData } from './lectors';
import { aggregateCapacityData } from './capacity';

export const aggregateWorkshopDifficultyName = (id, difficulties) => {
  if (difficulties) {
    const difficulty = difficulties.find(record => record.id === id);
    return difficulty ? difficulty.name : null;
  }
  return null;
};

export const aggregateWorkshopPriceLevelData = priceLevels => (priceItem) => {
  const priceLevelId = priceItem.price_level;
  if (priceLevels) {
    const priceLevel = priceLevels.find(priceLevelItem => priceLevelItem.id === priceLevelId);
    if (priceLevel) {
      return {
        id: priceItem.id,
        price: priceItem.price,
        level: priceLevel.name,
        takesEffectOn: priceLevel.takesEffectOn,
        endsOn: priceLevel.endsOn,
      };
    }
  }
  return null;
};

export const aggregateWorkshopPriceData = (prices, priceLevels) => (
  prices && priceLevels ?
    prices
      .map(aggregateWorkshopPriceLevelData(priceLevels))
      .filter(item => item) : []
);

export const aggregateWorkshopData = (
  lectors,
  roles,
  difficulties,
  priceLevels,
  capacity
) => workshop => (
  workshop ? ({
    ...workshop,
    capacityStatus: aggregateCapacityData(workshop.id, capacity) || {},
    difficulty: aggregateWorkshopDifficultyName(workshop.difficulty, difficulties),
    lectors: aggregateLectorsData(workshop.lectors, lectors, roles),
    prices: aggregateWorkshopPriceData(workshop.prices, priceLevels),
  }) : null
);
