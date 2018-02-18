import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import FormErrors from '../components/FormErrors';

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
});

export default connect(mapStateToProps)(FormErrors);
