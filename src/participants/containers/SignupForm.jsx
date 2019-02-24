import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { getTeamOptions, getTeamsProgress } from '../selectors'
import { signup, teamsRequired } from '../actions'
import { signupValidator } from '../validators'

import mapProgress from '../../containers/mapProgress'
import SignupForm from '../components/SignupForm'

const mapStateToProps = state => ({
  teams: getTeamOptions(state)
})

const mapDispatchToProps = {
  onSubmit: signup
}

const container = mapProgress(connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: signup.form,
  validate: signupValidator
})(SignupForm)), {
  progressSelector: getTeamsProgress,
  onResourceChange: teamsRequired
})

container.displayName = 'Connect(ReduxForm(SignupForm))'

export default container
