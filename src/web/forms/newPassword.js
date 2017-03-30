import validator from './validator';

const schema = {
  properties: {
    newPassword: {
      maxLength: 255,
      messages: {
        required: 'Jaké bude tvoje nové heslo?',
        minLength: 'Heslo musí mít alespoň 5 znaků',
      },
      minLength: 5,
      required: true,
      type: 'string',
    },
    newPasswordConfirm: {
      conform: (value, formValues) => value === formValues.newPassword,
      messages: {
        required: 'Jaké bude tvoje nové heslo?',
        conform: 'Hesla nesouhlasí',
      },
      required: true,
      type: 'string',
    },
  },
};

export default validator(schema);
