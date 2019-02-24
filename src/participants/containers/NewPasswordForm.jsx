import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import ChangePasswordForm from '../components/ChangePasswordForm'
import ChangePasswordSuccess from '../components/ChangePasswordSuccess'

import { newPassword } from '../actions'
import { newPasswordValidator } from '../validators'

const mapStateToProps = () => ({
  newPassword: true,
  successComponent: ChangePasswordSuccess
})

const mapDispatchToProps = {
  onSubmit: newPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: newPassword.form,
  validate: newPasswordValidator
})(ChangePasswordForm))
