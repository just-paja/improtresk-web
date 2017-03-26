import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Workshops from '../components/pages/workshops';

import { workshopsAll } from '../selectors/workshops';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  workshops: workshopsAll(state),
  ready:
    state.workshops.list.ready &&
    state.capacity.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.WORKSHOPS_MOUNTED }),
  onUnmount: () => ({ type: actions.WORKSHOPS_UNMOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Workshops);
