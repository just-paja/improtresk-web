import { validate } from 'revalidator';

export const emailField = {
  format: 'email',
  maxLength: 255,
  message: 'Vyplň e-mail v podporovaném tvaru',
  required: true,
  type: 'string',
};

export default schema => (values) => {
  const status = validate(values, schema);
  return {
    ...status,
    errors: status.errors.reduce((errorStatus, field) => ({
      ...errorStatus,
      [field.property]: field.message,
    }), {}),
  };
};
