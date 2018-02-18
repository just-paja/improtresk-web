import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChangePassword from '../../components/pages/participant/changePassword';

import { getForm } from '../../selectors/forms';

import * as actions from '../../constants/actions';

const mapStateToProps = state => ({
  resetPassword: getForm(state, 'resetPassword'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChangePasswordChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onChangePasswordSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
