import { connect } from 'react-redux';

import NewPassword from './components/NewPassword';

import { getNewPasswordForm } from '../participants/selectors';

import {
  formChange,
  formClear,
  formDefine,
  formSubmit,
} from '../forms/actions';

const mapStateToProps = state => ({
  newPassword: getNewPasswordForm(state),
});

const mapDispatchToProps = {
  onMount: token => formDefine('newPassword', {
    token,
  }),
  onNewPasswordChange: formChange,
  onNewPasswordSubmit: formSubmit,
  onUnmount: formClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
