import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ForgottenPassword from '../../components/pages/participant/forgottenPassword';

import { getForm } from '../../selectors/forms';

import * as actions from '../../constants/actions';

const mapStateToProps = state => ({
  resetPassword: getForm(state, 'resetPassword'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onResetPasswordChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onResetPasswordSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPassword);
