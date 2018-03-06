import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import NewsList from '../components/NewsList';
import mapProgress from '../../containers/mapProgress';

import { getNewsList, getNewsListProgress } from '../selectors';
import { requireNewsList } from '../actions';

const mapStateToProps = state => ({
  news: getNewsList(state),
  translate: getTranslate(state.locale),
});

export default mapProgress(connect(mapStateToProps)(NewsList), {
  progressSelector: getNewsListProgress,
  onResourceChange: requireNewsList,
});
