import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Fees from './components/Fees';

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
});

export default connect(mapStateToProps)(Fees);
