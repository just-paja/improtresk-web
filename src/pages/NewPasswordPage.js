import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { initialize } from 'redux-form'

import NewPasswordPage from './components/NewPasswordPage'

import { newPassword } from '../participants/actions'

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
})

const mapDispatchToProps = {
  onMount: token => initialize(newPassword.form, {
    token
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordPage)
