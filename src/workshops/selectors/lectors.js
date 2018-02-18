import { getData, isRequired } from 'react-saga-rest';

export const findLectorRoleName = (roles, id) => {
  if (roles) {
    const role = roles.find(roleRecord => roleRecord.id === id);
    return role ? role.name : null;
  }
  return null;
};

export const aggregateLectorData = (lectors, roles) => (lectorPosition) => {
  if (lectorPosition && lectors && roles) {
    const lector = lectors.find(lectorItem => lectorPosition.lector === lectorItem.id);
    const role = findLectorRoleName(roles, lectorPosition.role);
    if (lector && role) {
      return {
        id: lectorPosition.id,
        lector,
        role,
      };
    }
  }
  return null;
};

export const aggregateLectorsData = (workshopLectors, lectors, roles) =>
  workshopLectors.map(aggregateLectorData(lectors, roles)).filter(item => item);


export const getLectorListState = state => state.workshops.lectors.list;
export const getLectorRolesState = state => state.workshops.lectors.roles;

export const getLectorRoles = getData(getLectorRolesState);
export const getLectors = getData(getLectorListState);

export const isLectorListRequired = isRequired(getLectorListState);
export const isLectorRolesListRequired = isRequired(getLectorRolesState);
