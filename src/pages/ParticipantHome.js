import { connect } from 'react-redux'

import ParticipantHome from './components/ParticipantHome'

import { logout } from '../participants/actions'
import { getParticipantDetail } from '../participants/selectors'

import { yearActiveNumber } from '../years/selectors'

const mapStateToProps = state => ({
  participant: getParticipantDetail(state),
  yearNumber: yearActiveNumber(state)
})

const mapDispatchToProps = {
  onLogout: logout
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantHome)
