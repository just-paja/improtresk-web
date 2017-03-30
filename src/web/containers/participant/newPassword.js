import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NewPassword from '../../components/pages/participant/newPassword';

import { getForm } from '../../selectors/forms';

import * as actions from '../../constants/actions';

const mapStateToProps = state => ({
  newPassword: getForm(state, 'newPassword'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: token => ({
    type: actions.FORM_VALUES_SET,
    form: 'newPassword',
    values: {
      token,
    },
  }),
  onNewPasswordChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onNewPasswordSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
  onUnmount: form => ({
    type: actions.FORM_VALUES_CLEAR,
    form,
  }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
