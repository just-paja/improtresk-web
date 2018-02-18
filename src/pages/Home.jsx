import { connect } from 'react-redux';

import Home from './components/Home';
import mapPageProgress from './mapPageProgress';

import { getNewsList } from '../news/selectors';
import { yearActive } from '../years/selectors';
import { getHomeProgress } from './selectors';
import { getText } from '../texts/selectors';

import * as actions from './constants';
import * as texts from '../texts/constants';

const selectAboutText = getText(texts.ABOUT_FESTIVAL_SHORT);

const mapStateToProps = state => ({
  about: selectAboutText(state),
  news: getNewsList(state),
  year: yearActive(state),
});

export default mapPageProgress(connect(mapStateToProps)(Home), {
  progressSelector: getHomeProgress,
  onResourceChange: () => ({ type: actions.PAGE_HOME_ENTERED }),
});
