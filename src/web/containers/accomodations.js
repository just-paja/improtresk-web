import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Accomodations from '../components/pages/accomodations';

import { accomodationAll } from '../selectors/accomodation';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  accomodations: accomodationAll(state),
  ready: state.accomodation.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.ACCOMODATION_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Accomodations);
