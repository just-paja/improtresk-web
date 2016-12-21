import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Workshops from '../components/pages/workshops';

import { workshopsAll } from '../selectors/workshops';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  workshops: workshopsAll(state),
  ready: state.workshops.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.WORKSHOPS_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Workshops);
