import { aggregateLectorsData } from './lectors';

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

export const aggregateWorkshopCapacityData = (workshopId, capacity) => {
  if (capacity) {
    const entry = capacity.find(cap => cap.id === workshopId);

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

export const aggregateWorkshopData = (
  lectors,
  roles,
  difficulties,
  priceLevels,
  capacity
) => (workshop) => {
  const data = workshop ? {
    ...workshop,
    capacityStatus: aggregateWorkshopCapacityData(workshop.id, capacity) || {},
    difficulty: aggregateWorkshopDifficultyName(workshop.difficulty, difficulties),
    lectors: aggregateLectorsData(workshop.lectors, lectors, roles),
    prices: aggregateWorkshopPriceData(workshop.prices, priceLevels),
  } : null;
  return data;
};
