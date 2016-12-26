import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Fees from '../components/pages/fees';

import { getText, readyTexts } from '../selectors/texts';

import * as actions from '../constants/actions';
import * as texts from '../constants/texts';

const mapStateToProps = state => ({
  whatDoYouPayFor: getText(state, texts.FEES_WHAT_DO_YOU_PAY_FOR),
  howToPay: getText(state, texts.FEES_HOW_TO_PAY),
  howToSignOut: getText(state, texts.FEES_HOW_TO_SIGN_OUT),
  ready: readyTexts(state, [
    texts.FEES_WHAT_DO_YOU_PAY_FOR,
    texts.FEES_HOW_TO_PAY,
    texts.FEES_HOW_TO_SIGN_OUT,
  ]),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onMount: () => ({ type: actions.FEES_MOUNTED }),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Fees);
