import { connect } from 'react-redux';

import ForgottenPassword from './components/ForgottenPassword';

import { getForm } from '../forms/selectors';

import { formChange, formClear, formSubmit } from '../forms/actions';

const mapStateToProps = state => ({
  resetPassword: getForm(state, 'resetPassword'),
});

export default connect(mapStateToProps, {
  onResetPasswordChange: formChange,
  onResetPasswordSubmit: formSubmit,
  onUnmount: formClear,
})(ForgottenPassword);
