import { connect } from 'react-redux'

import { getRegistrationOpenDate, getRegistrationCloseDate } from '../../years/selectors'

import SignupButton from '../components/SignupButton'

const mapStateToProps = state => ({
  alreadyFull: false,
  endAt: getRegistrationCloseDate(state),
  startAt: getRegistrationOpenDate(state)
})

export default connect(mapStateToProps)(SignupButton)
