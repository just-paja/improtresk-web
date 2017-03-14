import validator from './validator';

const schema = {
  properties: {
    email: {
      format: 'email',
      maxLength: 255,
      message: 'Vyplň e-mail v podporovaném tvaru',
      required: true,
      type: 'string',
    },
    password: {
      maxLength: 255,
      message: 'Vyplň svoje heslo',
      required: true,
      type: 'string',
    },
  },
};

export default validator(schema);
