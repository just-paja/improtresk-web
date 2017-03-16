import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { getLectorRoles, getLectors } from './lectors';
import { getPriceLevels } from './prices';
import { getWorkshopDifficulties, mapWorkshop } from './workshops';

const getArchiveState = state => state.archive;
const getArchiveData = state => getArchiveState(state).data;

export const getCurrent = createSelector(getArchiveState, state => state.current);

export const getArchivedYear = createSelector(
  getArchiveData,
  current => (current ? current.year : null)
);

export const getArchivedYearTopic = createSelector(
  getArchiveData,
  current => (current ? current.topic : null)
);

export const getArchivedYearWorkshops = createSelector(
  [getArchiveData, getLectors, getLectorRoles, getWorkshopDifficulties, getPriceLevels],
  (current, lectors, roles, difficulties, priceLevels) => (current ? (
    current.workshops.map(mapWorkshop(lectors, roles, difficulties, priceLevels))
  ) : [])
);

export const isValid = createSelector(
  getArchiveState,
  state => isStateValid(state) && state.data && state.current === state.data.year
);
