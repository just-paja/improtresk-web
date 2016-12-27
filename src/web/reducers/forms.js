import { combined } from './common';

import * as constants from '../constants/actions';

const defaultState = {};

export const defaultFormState = {
  errors: {},
  values: {},
  valid: true,
};

const workWithForm = (state, action) => (
  state[action.form] ? state : Object.assign({}, state, {
    [action.form]: Object.assign({}, defaultFormState),
  })
);

export default combined(defaultState, {
  [constants.FORM_FIELD_CHANGE]: (state, action) => {
    const fixedState = workWithForm(state, action);
    return Object.assign({}, fixedState, {
      [action.form]: {
        values: {
          ...fixedState[action.form].values,
          [action.field]: action.value,
        },
      },
    });
  },
  [constants.FORM_VALUES_VALIDATE]: (state, action) => {
    const fixedState = workWithForm(state, action);
    return Object.assign({}, fixedState, {
      [action.form]: {
        ...fixedState[action.form],
        valid: action.valid,
        errors: action.errors,
      },
    });
  },
});
