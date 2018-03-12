import { connect } from 'react-redux';

import ForgottenPassword from './components/ForgottenPassword';

import { getResetPasswordForm } from '../participants/selectors';

import { formChange, formClear, formSubmit } from '../forms/actions';

const mapStateToProps = state => ({
  resetPassword: getResetPasswordForm(state),
});

export default connect(mapStateToProps, {
  onResetPasswordChange: formChange,
  onResetPasswordSubmit: formSubmit,
  onUnmount: formClear,
})(ForgottenPassword);
