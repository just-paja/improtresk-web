import moment from 'moment';

import validator from '../forms/validator';
import {
  boolField,
  dateOfBirthField,
  emailField,
  humanNameField,
  passwordField,
  phoneField,
} from '../forms/fields';

export const signupValidator = validator({
  properties: {
    name: humanNameField({ required: true }),
    email: emailField({ required: true }),
    phone: phoneField({ required: true }),
    password: passwordField(),
    passwordCheck: passwordField({
      conform: (value, formValues) => value === formValues.password,
      messages: {
        conform: 'participants.passwordsDoNotMatch',
      },
    }),
    birthday: dateOfBirthField({
      conform: value => moment().diff(value, 'years') > 18,
      maxLength: 32,
      messages: {
        conform: 'participants.mustBeOlderThan18',
      },
    }),
    rules_accepted: boolField({
      message: 'participants.rulesRequired',
      required: true,
    }),
  },
});

export const loginValidator = validator({
  properties: {
    email: emailField({ required: true }),
    password: passwordField(),
  },
});

export const changePasswordValidator = validator({
  properties: {
    oldPassword: passwordField(),
    newPassword: passwordField(),
    newPasswordConfirm: passwordField({
      conform: (value, formValues) => value === formValues.newPassword,
      messages: {
        conform: 'participants.passwordsDoNotMatch',
      },
    }),
  },
});

export const newPasswordValidator = validator({
  properties: {
    newPassword: passwordField(),
    newPasswordConfirm: passwordField({
      conform: (value, formValues) => value === formValues.newPassword,
      messages: {
        conform: 'participants.passwordsDoNotMatch',
      },
    }),
  },
});

export const resetPasswordValidator = validator({
  properties: {
    email: emailField(),
  },
});
