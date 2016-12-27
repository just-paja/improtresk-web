import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Signup from '../components/pages/signup';

import { yearCurrent } from '../selectors/years';
import { getForm } from '../selectors/forms';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  signup: getForm(state, 'signup'),
  ready: state.years.ready,
  year: yearCurrent(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onMount: () => ({ type: actions.SIGNUP_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
