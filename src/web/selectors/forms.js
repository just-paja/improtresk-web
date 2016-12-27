import { defaultFormState } from '../reducers/forms';

export const getForm = (state, form) =>
  state.forms[form] || Object.assign({}, defaultFormState);

export const isFormValid = (state, form) => !!getForm(state, form).valid;
