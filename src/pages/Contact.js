import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Contact from './components/Contact';

import * as constants from './constants';

export default connect(state => ({
  translate: getTranslate(state.locale),
}), {
  onMount: () => ({ type: constants.PAGE_CONTACT_ENTERED }),
})(Contact);
