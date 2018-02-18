import {
  FORM_FIELD_CHANGE,
  FORM_RESET,
  FORM_SUBMIT,
  FORM_VALUES_CLEAR,
  FORM_VALUES_SET,
} from '../constants';

export const formChange = (form, field, value) => ({
  type: FORM_FIELD_CHANGE,
  form,
  field,
  value,
});

export const formDefine = (form, values) => ({ type: FORM_VALUES_SET, form, values });

export const formClear = form => ({ type: FORM_VALUES_CLEAR, form });

export const formReset = form => ({ type: FORM_RESET, form });

export const formSubmit = form => ({ type: FORM_SUBMIT, form });
