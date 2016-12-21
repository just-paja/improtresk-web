import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/pages/home';

import { newsAll } from '../selectors/news';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  news: newsAll(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.HOME_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
