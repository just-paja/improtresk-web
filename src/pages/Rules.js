import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Rules from './components/Rules';

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
});

export default connect(mapStateToProps)(Rules);
