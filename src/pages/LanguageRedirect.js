import { connect } from 'react-redux'

import LanguageRedirect from './components/LanguageRedirect'

import { getLang } from '../selectors'

const mapStateToProps = state => ({
  lang: getLang(state)
})

export default connect(mapStateToProps)(LanguageRedirect)
