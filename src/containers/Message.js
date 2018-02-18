import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Message from '../components/Message';

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
});

export default connect(mapStateToProps)(Message);
