import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Accomodation from './components/Accomodation';

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
});

export default connect(mapStateToProps)(Accomodation);
