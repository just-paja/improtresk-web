import { createSelector } from 'reselect';

const getLectorListReady = state => state.lectors.list.ready;
const getLectorRolesReady = state => state.lectors.roles.ready;
const getWorkshopDifficultiesReady = state => state.workshops.difficulties.ready;
const getYearsReady = state => state.years.ready;

export const isAppReady = createSelector(
  [
    getLectorListReady,
    getLectorRolesReady,
    getWorkshopDifficultiesReady,
    getYearsReady,
  ],
  (...everything) => everything.every(thing => !!thing)
);

export default { isAppReady };
