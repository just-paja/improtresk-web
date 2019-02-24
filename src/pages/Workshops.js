import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import Workshops from './components/Workshops'

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
})

export default connect(mapStateToProps)(Workshops)
