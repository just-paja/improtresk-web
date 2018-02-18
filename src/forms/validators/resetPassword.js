import validator, { emailField } from './validator';

const schema = {
  properties: {
    email: emailField,
  },
};

export default validator(schema);
