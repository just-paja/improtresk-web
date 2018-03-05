import { createSelector } from 'reselect';
import { getProgress } from 'react-saga-rest';

import {
  getLectorListState,
  getLectorRolesState,
  getDifficultiesState,
} from '../workshops/selectors';

import { getYearListState } from '../years/selectors';

const getState = state => state;

const countReducerFlags = (key, object) =>
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

export const getAppProgress = getProgress(
  getLectorListState,
  getLectorRolesState,
  getDifficultiesState,
  getYearListState
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
