import { connect } from 'react-redux';

import Contact from './components/Contact';

import * as constants from './constants';

export default connect(() => ({}), {
  onMount: () => ({ type: constants.PAGE_CONTACT_ENTERED }),
})(Contact);
