import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import mapPageProgress from './mapPageProgress';
import Workshops from './components/Workshops';

import { getWorkshopList } from '../workshops/selectors';
import { getWorkshopsPageProgress } from './selectors';

import * as actions from './constants';

const mapStateToProps = state => ({
  progress: getWorkshopsPageProgress(state),
  translate: getTranslate(state.locale),
  workshops: getWorkshopList(state),
});

export default mapPageProgress(connect(mapStateToProps)(Workshops), {
  progressSelector: getWorkshopsPageProgress,
  onResourceChange: () => ({ type: actions.PAGE_WORKSHOPS_ENTERED }),
  onExit: () => ({ type: actions.PAGE_WORKSHOPS_LEFT }),
});
