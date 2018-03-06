import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Food from './components/Food';

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
});

export default connect(mapStateToProps)(Food);
