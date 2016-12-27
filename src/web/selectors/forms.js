export const getForm = (state, form) => state.forms[form] || {
  errors: {},
  values: {},
};

export const getFormFromState = form => state => getForm(state, form);

export const isFormValid = (state, form) => !!(
  state.forms[form] &&
  state.forms[form].valid
);
