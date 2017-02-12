import { createSelector } from 'reselect';

import { isStateValid } from './common';

const getLectorListState = state => state.lectors.list;
const getLectorRolesState = state => state.lectors.roles;

export const getLectorRoles = createSelector(getLectorRolesState, state => state.data);
export const getLectors = createSelector(getLectorListState, state => state.data);

export const shouldFetchList = createSelector(getLectorListState, isStateValid);
export const shouldFetchRoles = createSelector(getLectorRolesState, isStateValid);

export const findLectorRoleName = (roles, id) => {
  const role = roles.find(roleRecord => roleRecord.id === id);
  return role ? role.name : null;
};

export default { shouldFetchList };
