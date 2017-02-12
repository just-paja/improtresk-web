import { createSelector } from 'reselect';

import { isStateValid } from './common';
import { getLectorRoles, getLectors } from './lectors';
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
  [getArchiveData, getLectors, getLectorRoles, getWorkshopDifficulties],
  (current, lectors, roles, difficulties) => (current ? (
    current.workshops.map(mapWorkshop(lectors, roles, difficulties)) || []
  ) : [])
);


export const isValid = state => isStateValid(getArchiveState(state));
