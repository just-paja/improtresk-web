import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Accomodations from '../components/pages/accomodations';

import { accomodationAll } from '../selectors/accomodation';
import { getText, readyTexts } from '../selectors/texts';

import * as actions from '../constants/actions';
import * as texts from '../constants/texts';

const mapStateToProps = state => ({
  accomodations: accomodationAll(state),
  intro: getText(state, texts.ACCOMODATION_INTRO),
  ready: state.accomodation.ready && readyTexts(state, [texts.ACCOMODATION_INTRO]),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.ACCOMODATION_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Accomodations);
