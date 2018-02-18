import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Locations from './components/Locations';
import mapPageProgress from './mapPageProgress';

import { getText } from '../texts/selectors';
import { getLocationMarkers } from '../workshops/selectors';
import { getLocationsPageProgress } from './selectors';

import * as actions from './constants';
import * as texts from '../texts/constants';

const getLocationsText = getText(texts.LOCATIONS_INTRO);

const mapStateToProps = state => ({
  intro: getLocationsText(state),
  markers: getLocationMarkers(state),
  translate: getTranslate(state.locale),
});

export default mapPageProgress(connect(mapStateToProps)(Locations), {
  progressSelector: getLocationsPageProgress,
  onResourceChange: () => ({ type: actions.PAGE_LOCATIONS_ENTERED }),
});
