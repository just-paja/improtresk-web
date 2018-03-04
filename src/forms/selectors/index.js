import { createSelector } from 'reselect';
import { defaultFormState } from '../reducers';

export const getForm = form => createSelector(
  state => state.forms[form],
  formState => ({ formName: form, ...(formState || defaultFormState) })
);

export const isFormValid = formName => createSelector(
  getForm(formName),
  form => form.valid
);
