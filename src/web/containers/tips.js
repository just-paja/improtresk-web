import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tips from '../components/pages/tips';

import { tipsAll } from '../selectors/tips';

import * as actions from '../constants/actions';

const mapStateToProps = state => ({
  tips: tipsAll(state),
  ready: state.tips.ready,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.TIPS_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tips);
