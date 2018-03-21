import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import ResetPasswordForm from '../components/ResetPasswordForm';
import ResetPasswordSuccess from '../components/ResetPasswordSuccess';

import { resetPassword } from '../actions';
import { resetPasswordValidator } from '../validators';

const mapStateToProps = () => ({
  newPassword: true,
  successComponent: ResetPasswordSuccess,
});

const mapDispatchToProps = {
  onSubmit: resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: resetPassword.form,
  validate: resetPasswordValidator,
})(ResetPasswordForm));
