import { connect } from 'react-redux';

import ChangePassword from '../components/ChangePassword';
import ChangePasswordSuccess from '../components/ChangePasswordSuccess';

import { getChangePasswordForm } from '../selectors';
import { formChange, formClear, formSubmit } from '../../forms/actions';

const mapStateToProps = state => ({
  formData: getChangePasswordForm(state),
  successComponent: ChangePasswordSuccess,
});

const mapDispatchToProps = {
  onChange: formChange,
  onSubmit: formSubmit,
  onUnmount: formClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
