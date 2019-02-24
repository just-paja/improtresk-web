import { getData, isRequired } from 'react-saga-rest'

export const getLectorListState = state => state.workshops.lectors.list
export const getLectorRolesState = state => state.workshops.lectors.roles

export const getLectorRoles = getData(getLectorRolesState)
export const getLectors = getData(getLectorListState)

export const isLectorListRequired = isRequired(getLectorListState)
export const isLectorRolesListRequired = isRequired(getLectorRolesState)
