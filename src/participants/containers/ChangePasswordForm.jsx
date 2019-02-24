import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import ChangePasswordForm from '../components/ChangePasswordForm'
import ChangePasswordSuccess from '../components/ChangePasswordSuccess'

import { changePassword } from '../actions'
import { changePasswordValidator } from '../validators'

const mapStateToProps = () => ({
  successComponent: ChangePasswordSuccess
})

const mapDispatchToProps = {
  onSubmit: changePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: changePassword.form,
  validate: changePasswordValidator
})(ChangePasswordForm))
