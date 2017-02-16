import { createSelector } from 'reselect';

const getLectorListReady = state => state.lectors.list.ready;
const getLectorRolesReady = state => state.lectors.roles.ready;
const getWorkshopDifficultiesReady = state => state.workshops.difficulties.ready;
const getYearsReady = state => state.years.ready;

const countReducerFlags = (key, object = {}) =>
  Object.keys(object).reduce((count, objectKey) => {
    let total = count;

    if (objectKey === key && object[key]) {
      total += 1;
    }

    if (object[objectKey] && typeof object[objectKey] === 'object') {
      total += countReducerFlags(key, object[objectKey]);
    }

    return total;
  }, 0);

export const isAppReady = createSelector(
  [
    getLectorListReady,
    getLectorRolesReady,
    getWorkshopDifficultiesReady,
    getYearsReady,
  ],
  (...everything) => everything.every(thing => !!thing)
);

export const countAppRequests = createSelector(
  state => state,
  state => countReducerFlags('loading', state)
);

export default { isAppReady };
