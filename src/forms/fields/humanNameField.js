import textField from './textField';

const humanNameField = ({
  maxLength = 128,
  messages,
  ...other
} = {}) => textField({
  maxLength,
  messages: {
    pattern: 'forms.notAHumanName',
    ...messages,
  },
  pattern: /^[a-z\u00E0-\u017F\-,.' ]*$/i,
  ...other,
});

export default humanNameField;
