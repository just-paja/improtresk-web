const field = ({
  messages,
  required = false,
  type = ['null', 'string'],
  ...other
} = {}) => ({
  allowEmpty: true,
  required,
  type,
  messages: {
    allowEmpty: 'forms.fieldEmpty',
    maxLength: 'forms.tooLong',
    minLength: 'forms.tooShort',
    required: 'forms.fieldRequired',
    type: 'forms.fieldRequired',
    ...messages,
  },
  ...other,
});

export default field;
