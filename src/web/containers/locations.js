import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Locations from '../components/pages/locations';

import { getText, readyTexts } from '../selectors/texts';
import {
  areLocationsReady,
  getLocationMarkers,
} from '../selectors/workshops';

import * as actions from '../constants/actions';
import * as texts from '../constants/texts';

const mapStateToProps = state => ({
  intro: getText(state, texts.LOCATIONS_INTRO),
  markers: getLocationMarkers(state),
  ready:
    areLocationsReady(state) &&
    readyTexts(state, [
      texts.LOCATIONS_INTRO,
    ]),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.REQUEST_WORKSHOP_LOCATIONS }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
