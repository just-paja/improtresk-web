import * as constants from '../constants';

export const requireWorkshopList = () => ({
  type: constants.WORKSHOPS_REQUIRED,
});

export const requireWorkshopDetail = () => ({
  type: constants.WORKSHOP_DETAIL_REQUIRED,
});

export const requireWorkshopDifficulties = () => ({
  type: constants.WORKSHOP_DIFFICULTIES_REQUIRED,
});

export const requireLector = () => ({
  type: constants.LECTORS_REQUIRED,
});

export const requireLectorList = () => ({
  type: constants.LECTORS_REQUIRED,
});

export const requireLectorRoles = () => ({
  type: constants.LECTOR_ROLES_REQUIRED,
});
