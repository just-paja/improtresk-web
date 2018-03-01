import { connect } from 'react-redux';
import mapPageProgress from './mapPageProgress';

import NewsDetail from './components/NewsDetail';

import { getNewsList, getNewsDetail } from '../news/selectors';
import { getForm } from '../forms/selectors';
import { getNewsDetailProgress } from './selectors';

import * as constants from './constants';

const mapStateToProps = state => ({
  poll: getForm(state, 'poll'),
  news: getNewsList(state),
  newsDetail: getNewsDetail(state),
});

const mapDispatchToProps = {
  onPollVote: (survey, answer) => ({
    type: constants.POLL_VOTE,
    survey,
    answer,
  }),
};

export default mapPageProgress(connect(mapStateToProps, mapDispatchToProps)(NewsDetail), {
  matchParam: 'slug',
  progressSelector: getNewsDetailProgress,
  onResourceChange: slug => ({ type: constants.PAGE_NEWS_DETAIL_ENTERED, slug }),
});
