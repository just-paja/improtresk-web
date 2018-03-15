import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Locations from './components/Locations';

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
});

export default connect(mapStateToProps)(Locations);
