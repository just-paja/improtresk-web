import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import Schedule from './components/Schedule'

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
})

export default connect(mapStateToProps)(Schedule)
