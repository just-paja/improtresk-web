import { connect } from 'react-redux'

import PrivateRoute from '../components/PrivateRoute'

import { getLang } from '../selectors'
import { getParticipantDetailState } from '../participants/selectors'

const mapStateToProps = state => ({
  lang: getLang(state),
  participantState: getParticipantDetailState(state)
})

export default connect(mapStateToProps)(PrivateRoute)
