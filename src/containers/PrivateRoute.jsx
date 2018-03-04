import { connect } from 'react-redux';

import PrivateRoute from '../components/PrivateRoute';

import { getLang } from '../selectors';
import { getParticipantDetail } from '../participants/selectors';

const mapStateToProps = state => ({
  lang: getLang(state),
  participant: getParticipantDetail(state),
});

export default connect(mapStateToProps)(PrivateRoute);
