import textField from './textField';

export default props => textField({
  maxLength: 32,
  minLength: 9,
  ...props,
});
