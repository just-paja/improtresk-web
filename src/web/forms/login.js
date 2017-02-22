import { validate } from 'revalidator';

const schema = {
  properties: {
    email: {
      format: 'email',
      maxLength: 255,
      message: 'Vyplň e-mail v podporovaném tvaru',
      required: true,
      type: 'string',
    },
    passwd: {
      maxLength: 255,
      message: 'Vyplň svoje heslo',
      required: true,
      type: 'string',
    },
  },
};

export default (values) => {
  const status = validate(values, schema);
  return {
    ...status,
    errors: status.errors.reduce((errorStatus, field) => ({
      ...errorStatus,
      [field.property]: field.message,
    }), {}),
  };
};
