import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getLectorListState = state => state.lectors.list;
const getLectorRolesState = state => state.lectors.roles;

export const shouldFetchList = createSelector(getLectorListState, isStateValid);
export const shouldFetchRoles = createSelector(getLectorRolesState, isStateValid);

export default { shouldFetchList };
