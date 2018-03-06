import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import NewsArticle from '../components/NewsArticle';
import mapProgress from '../../containers/mapProgress';

import { getNewsDetail, getNewsDetailProgress } from '../selectors';
import { requireNewsDetail } from '../actions';
import { vote } from '../../polls/actions';

const mapStateToProps = state => ({
  newsDetail: getNewsDetail(state),
  translate: getTranslate(state.locale),
});

const mapDispatchToProps = {
  onVote: vote,
};

export default mapProgress(connect(mapStateToProps, mapDispatchToProps)(NewsArticle), {
  progressSelector: getNewsDetailProgress,
  onResourceChange: requireNewsDetail,
});
