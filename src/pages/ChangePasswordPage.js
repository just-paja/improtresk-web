import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import ChangePasswordPage from './components/ChangePasswordPage'

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
})

export default connect(mapStateToProps)(ChangePasswordPage)
