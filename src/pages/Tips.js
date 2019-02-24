import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import Tips from './components/Tips'

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
})

export default connect(mapStateToProps)(Tips)
