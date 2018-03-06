import { connect } from 'react-redux';

import NewsDetail from './components/NewsDetail';

import * as constants from './constants';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  onResourceChange: slug => ({ type: constants.PAGE_NEWS_DETAIL_ENTERED, slug }),
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
