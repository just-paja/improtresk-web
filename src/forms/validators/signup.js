import moment from 'moment';

import validator, { emailField } from './validator';

const schema = {
  properties: {
    name: {
      maxLength: 255,
      messages: {
        pattern: 'Vyplň svoje celé jméno pomocí písmenek a mezer',
        required: 'Vyplň svoje celé jméno',
      },
      pattern: /^[a-z\u00E0-\u017F ]+$/i,
      required: true,
      type: 'string',
    },
    email: emailField,
    phone: {
      maxLength: 32,
      message: 'Vyplň svoje mobilní telefonní číslo',
      minLength: 9,
      required: true,
      type: 'string',
    },
    password: {
      maxLength: 255,
      messages: {
        required: 'Jaké bude tvoje heslo?',
        minLength: 'Heslo musí mít alespoň 5 znaků',
      },
      minLength: 5,
      required: true,
      type: 'string',
    },
    passwordCheck: {
      conform: (value, formValues) => value === formValues.password,
      messages: {
        required: 'Jaké bude tvoje heslo?',
        conform: 'Hesla nesouhlasí',
      },
      required: true,
      type: 'string',
    },
    birthday: {
      conform: value => moment().diff(value, 'years') > 18,
      maxLength: 32,
      messages: {
        required: 'Vyplň prosím datum svého narození',
        pattern: 'Vyplň datum svého narození v podporovaném tvaru 1970-01-01',
        conform: 'Musí ti být víc jak 18',
      },
      pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
      required: true,
      type: 'string',
    },
    rules_accepted: {
      message: 'Bez toho abys souhlasil s našimi pravidly se nemůžeš zúčastnit',
      required: true,
      enum: [true],
      type: 'boolean',
    },
  },
};

export default validator(schema);
