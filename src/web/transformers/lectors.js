import { findLectorRoleName } from '../selectors/lectors';

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
