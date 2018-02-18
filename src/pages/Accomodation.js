import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Accomodation from './components/Accomodation';
import mapPageProgress from './mapPageProgress';

import { getAccomodationList } from '../accomodation/selectors';
import { getAccomodationPageProgress } from './selectors';
import { getText } from '../texts/selectors';

import * as actions from './constants';
import * as texts from '../texts/constants';

const getIntroText = getText(texts.ACCOMODATION_INTRO);

const mapStateToProps = state => ({
  intro: getIntroText(state),
  accomodationList: getAccomodationList(state),
  translate: getTranslate(state.locale),
});

export default mapPageProgress(connect(mapStateToProps)(Accomodation), {
  progressSelector: getAccomodationPageProgress,
  onResourceChange: () => ({ type: actions.PAGE_ACCOMODATION_ENTERED }),
  onExit: () => ({ type: actions.PAGE_ACCOMODATION_LEFT }),
});
