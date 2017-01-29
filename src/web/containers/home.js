import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/pages/home';

import { getText, readyTexts } from '../selectors/texts';
import { newsAll } from '../selectors/news';
import { yearActive } from '../selectors/years';

import * as actions from '../constants/actions';
import * as texts from '../constants/texts';

const mapStateToProps = state => ({
  about: getText(state, texts.ABOUT_FESTIVAL_SHORT),
  news: newsAll(state),
  ready: state.years.ready && state.news.list.ready && readyTexts(state, [
    texts.ABOUT_FESTIVAL_SHORT,
  ]),
  year: yearActive(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.HOME_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
