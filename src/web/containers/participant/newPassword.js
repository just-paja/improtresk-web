import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NewPassword from '../../components/pages/participant/newPassword';

import { getForm } from '../../selectors/forms';

import * as actions from '../../constants/actions';

const mapStateToProps = state => ({
  resetPassword: getForm(state, 'resetPassword'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onNewPasswordChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onNewPasswordSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
