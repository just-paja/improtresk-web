import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Conditions from '../components/pages/conditions';

import { currentConditions } from '../selectors/conditions';
import { yearCurrent } from '../selectors/years';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  conditions: currentConditions(state),
  ready: state.years.ready && state.conditions.current.ready,
  year: yearCurrent(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.CONDITIONS_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Conditions);
