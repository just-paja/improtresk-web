import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import mapPageProgress from './mapPageProgress';
import Tips from './components/Tips';

import { getTipList } from '../texts/selectors';
import { getTipListPageProgress } from './selectors';

import * as constants from './constants';

const mapStateToProps = state => ({
  tips: getTipList(state),
  translate: getTranslate(state.locale),
});

export default mapPageProgress(connect(mapStateToProps)(Tips), {
  progressSelector: getTipListPageProgress,
  onResourceChange: () => ({ type: constants.PAGE_TIPS_ENTERED }),
});
