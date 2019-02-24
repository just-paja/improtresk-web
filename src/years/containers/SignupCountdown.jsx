import { connect } from 'react-redux'

import { getRegistrationOpenDate, getRegistrationCloseDate } from '../selectors'
import SignupCountdown from '../components/SignupCountdown'

const mapStateToProps = state => ({
  openDate: getRegistrationOpenDate(state),
  closeDate: getRegistrationCloseDate(state)
})

export default connect(mapStateToProps)(SignupCountdown)
