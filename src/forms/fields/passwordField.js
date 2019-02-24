import textField from './textField'

export default props => textField({
  maxLength: 255,
  minLength: 5,
  required: true,
  ...props
})
