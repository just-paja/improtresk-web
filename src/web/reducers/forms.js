import { combined } from './common';

import * as constants from '../constants/actions';

const defaultState = {};

const getSubmitErrors = (action) => {
  if (action.error) {
    return [action.error.message];
  }

  if (action.data && action.data.errors) {
    return action.data.errors;
  }

  return null;
};

export const defaultFormState = {
  errors: {},
  saved: false,
  submitted: false,
  loading: false,
  valid: true,
  values: {},
};

const ensureFormIsPresent = (state, action) => (
  state[action.form] ? state : Object.assign({}, state, {
    [action.form]: Object.assign({}, defaultFormState),
  })
);

const workWithForm = reducer => (state, action) =>
  reducer(ensureFormIsPresent(state, action), action);

export default combined(defaultState, {
  [constants.FORM_FIELD_CHANGE]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        values: {
          ...state[action.form].values,
          [action.field]: action.value,
        },
      },
    }
  )),
  [constants.FORM_VALUES_VALIDATE]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        valid: action.valid,
        errors: action.errors,
      },
    }
  )),
  [constants.FORM_VALUES_SET]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        values: { ...action.values },
      },
    }
  )),
  [constants.FORM_VALUES_CLEAR]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        values: {},
        submitted: false,
        saved: false,
      },
    }
  )),
  [constants.FORM_SUBMIT]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        submitErrors: [],
        submitted: true,
      },
    }
  )),
  [constants.FORM_SUBMIT_ALLOWED]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        loading: true,
        valid: action.valid,
        errors: action.errors,
      },
    }
  )),
  [constants.FORM_SUBMIT_PREVENTED]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        loading: false,
        valid: action.valid,
        errors: action.errors,
      },
    }
  )),
  [constants.FORM_SUBMIT_STARTED]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        loading: true,
        saved: false,
      },
    }
  )),
  [constants.FORM_SUBMIT_SUCCESS]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        loading: false,
        saved: true,
      },
    }
  )),
  [constants.FORM_SUBMIT_ERROR]: workWithForm((state, action) => Object.assign(
    {},
    state,
    {
      [action.form]: {
        ...state[action.form],
        loading: false,
        errors: action.data || {},
        submitErrors: getSubmitErrors(action),
        saved: false,
      },
    }
  )),
});
