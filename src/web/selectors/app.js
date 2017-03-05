import { createSelector } from 'reselect';

const getState = state => state;
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
  getState,
  state => countReducerFlags('loading', state)
);

const getFatalErrors = (object, errors = []) => {
  Object.keys(object).forEach((objectKey) => {
    const val = object[objectKey];

    if (val) {
      if (objectKey === 'error' && val.message) {
        errors.push(val.message);
      } else if (typeof val === 'object' && !Array.isArray(val)) {
        getFatalErrors(val, errors);
      }
    }
  });

  return errors;
};

export const getAppErrors = createSelector(
  getState,
  getFatalErrors
);

export default { isAppReady };
