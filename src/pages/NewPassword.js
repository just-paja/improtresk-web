import { connect } from 'react-redux';

import NewPassword from './components/NewPassword';

import { getForm } from '../forms/selectors';

import {
  formChange,
  formClear,
  formDefine,
  formSubmit,
} from '../forms/actions';

const mapStateToProps = state => ({
  newPassword: getForm(state, 'newPassword'),
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
