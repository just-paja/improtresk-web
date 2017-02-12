import { createSelector } from 'reselect';

const getLectorListReady = state => state.lectors.list.ready;
const getLectorRolesReady = state => state.lectors.roles.ready;
const getYearsReady = state => state.years.ready;

export const isAppReady = createSelector(
  [
    getLectorListReady,
    getLectorRolesReady,
    getYearsReady,
  ],
  (...everything) => everything.every(thing => !!thing)
);

export default { isAppReady };
