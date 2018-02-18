import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Conditions from './components/Conditions';
import mapPageProgress from './mapPageProgress';

import { yearCurrent, getConditions } from '../years/selectors';
import { getConditionsPageProgress } from './selectors';

import * as constants from './constants';

const mapStateToProps = state => ({
  conditions: getConditions(state),
  progress: (state),
  translate: getTranslate(state.locale),
  year: yearCurrent(state),
});

export default mapPageProgress(connect(mapStateToProps)(Conditions), {
  progressSelector: getConditionsPageProgress,
  onResourceChange: () => ({ type: constants.PAGE_CONDITIONS_ENTERED }),
});
