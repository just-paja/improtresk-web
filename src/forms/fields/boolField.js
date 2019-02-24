import textField from './textField'

export default props => textField({
  allowEmpty: false,
  required: true,
  conform: value => !!value,
  type: ['null', 'boolean'],
  messages: {
    conform: 'forms.fieldRequired'
  },
  ...props
})
