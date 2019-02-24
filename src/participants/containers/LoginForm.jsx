import { getFormSubmitErrors, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import { login } from '../actions'
import { loginValidator } from '../validators'
import { getParticipantDetail } from '../selectors'

import LoginForm from '../components/LoginForm'

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors(login.form)(state),
  participant: getParticipantDetail(state)
})

const mapDispatchToProps = {
  onSubmit: login
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: login.form,
  validate: loginValidator
})(LoginForm))
