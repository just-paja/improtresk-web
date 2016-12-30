import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NewsDetail from '../components/pages/newsDetail';

import { newsAll, getNewsDetail } from '../selectors/news';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  news: newsAll(state),
  newsDetail: getNewsDetail(state),
  ready: state.news.detail.ready && state.news.list.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: news => ({ type: actions.NEWS_DETAIL_MOUNTED, news }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
