import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Fees from './components/Fees';
import mapPageProgress from './mapPageProgress';

import { getText, getTextProgress } from '../texts/selectors';

import * as constants from './constants';
import * as texts from '../texts/constants';

const whatDoYouPayForSelector = getText(texts.FEES_WHAT_DO_YOU_PAY_FOR);
const howToPaySelector = getText(texts.FEES_HOW_TO_PAY);
const howToSignOutSelector = getText(texts.FEES_HOW_TO_SIGN_OUT);

const mapStateToProps = state => ({
  howToPay: howToPaySelector(state),
  howToSignOut: howToSignOutSelector(state),
  translate: getTranslate(state.locale),
  whatDoYouPayFor: whatDoYouPayForSelector(state),
});


export default mapPageProgress(connect(mapStateToProps)(Fees), {
  progressSelector: getTextProgress(
    texts.FEES_WHAT_DO_YOU_PAY_FOR,
    texts.FEES_HOW_TO_PAY,
    texts.FEES_HOW_TO_SIGN_OUT
  ),
  onResourceChange: () => ({ type: constants.PAGE_FEES_ENTERED }),
});
