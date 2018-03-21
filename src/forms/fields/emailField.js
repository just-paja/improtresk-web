import textField from './textField';

const emailField = ({
  messages,
  maxLength = 255,
  ...other
} = {}) => textField({
  allowEmpty: true,
  maxLength,
  messages: {
    pattern: 'forms.notAnEmail',
    ...messages,
  },
  pattern: /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/,
  ...other,
});

export default emailField;
