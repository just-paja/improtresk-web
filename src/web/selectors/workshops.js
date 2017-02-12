import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { findLectorRoleName, getLectorRoles, getLectors } from './lectors';

const getWorkshopDetailState = state => state.workshops.detail;
const getWorkshopDifficultiesState = state => state.workshops.difficulties;
const getWorkshopListState = state => state.workshops.list;

const findDifficultyName = (difficulties, id) => {
  const difficulty = difficulties.find(record => record.id === id);
  return difficulty ? difficulty.name : null;
};

export const mapWorkshop = (lectors, roles, difficulties) => workshop => (
  workshop ?
    ({
      ...workshop,
      difficulty: findDifficultyName(difficulties, workshop.difficulty),
      lectors: workshop.lectors.map(lectorPosition => ({
        id: lectorPosition.id,
        lector: lectors.find(lector => lectorPosition.lector === lector.id),
        role: findLectorRoleName(roles, lectorPosition.role),
      })),
    }) : null
);

export const getWorkshopDifficulties = createSelector(
  getWorkshopDifficultiesState,
  state => state.data
);

export const getWorkshopDetailId = createSelector(
  getWorkshopDetailState,
  state => state.id
);

export const workshopsDetail = createSelector(
  [getWorkshopDetailState, getLectors, getLectorRoles, getWorkshopDifficulties],
  (workshop, lectors, roles, difficulties) =>
    mapWorkshop(lectors, roles, difficulties)(workshop.data)
);
export const workshopsAll = createSelector(
  [getWorkshopListState, getLectors, getLectorRoles, getWorkshopDifficulties],
  (workshops, lectors, roles, difficulties) =>
    workshops.data.map(mapWorkshop(lectors, roles, difficulties))
);

export const shouldFetchList = createSelector(
  getWorkshopListState,
  state => isStateValid(state)
);
export const shouldFetchDetail = createSelector(
  getWorkshopDetailState,
  state => isStateValid(state)
);
export const shouldFetchDifficulties = createSelector(
  getWorkshopDifficultiesState,
  state => isStateValid(state)
);
