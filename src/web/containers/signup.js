import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Signup from '../components/pages/signup';

import { yearCurrent } from '../selectors/years';
import { getForm } from '../selectors/forms';
import {
  areSignupsOpen,
  getSignupsCloseDate,
  getSignupsOpenDate,
} from '../selectors/signups';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  signup: getForm(state, 'signup'),
  signupsCloseDate: getSignupsCloseDate(state),
  signupsOpen: areSignupsOpen(state),
  signupsOpenDate: getSignupsOpenDate(state),
  ready: state.years.ready,
  revalidate: state.session.revalidated,
  year: yearCurrent(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange: (form, field, value) => ({
    type: actions.FORM_FIELD_CHANGE,
    form,
    field,
    value,
  }),
  onSubmit: form => ({ type: actions.FORM_SUBMIT, form }),
  onSignupsOpen: () => ({ type: actions.SIGNUPS_OPEN }),
  onMount: () => ({ type: actions.SIGNUP_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
