import validator, { emailField } from './validator';

const schema = {
  properties: {
    email: emailField,
    password: {
      maxLength: 255,
      message: 'Vyplň svoje heslo',
      required: true,
      type: 'string',
    },
  },
};

export default validator(schema);
