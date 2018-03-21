import { createRoutine as createRoutineBase } from 'redux-saga-routines';

import * as constants from './constants';

const payloadCreator = payload => payload;
const metaCreator = (payload, meta) => meta;

export const createRoutine = (name, resource) => {
  if (!name) {
    throw new Error('Routine name must be defined!');
  }
  const routine = createRoutineBase(name, payloadCreator, metaCreator);
  routine.resource = resource;
  return routine;
};

export const createCollectionRoutine = (name, resource) => {
  const routine = createRoutine(name, resource);
  routine.INVALIDATE = `${name}/INVALIDATE`;
  routine.invalidate = () => ({ type: `${name}/INVALIDATE` });
  return routine;
};

export const createCapRoutine = (name, resource) => {
  const routine = createCollectionRoutine(name, resource);
  routine.UNSUBSCRIBE = `${name}/UNSUBSCRIBE`;
  routine.SUBSCRIBE = `${name}/SUBSCRIBE`;
  routine.unsubscribe = () => ({ type: `${name}/UNSUBSCRIBE` });
  routine.subscribe = () => ({ type: `${name}/SUBSCRIBE` });
  return routine;
};

export const createFormRoutine = (form, resource) => {
  const routine = createRoutine(`${form}/SUBMIT`, payloadCreator, metaCreator);
  routine.resource = resource;
  routine.form = form;
  return routine;
};

export const createRedirectRoutine = path => () => ({
  type: constants.REDIRECT,
  path,
});
