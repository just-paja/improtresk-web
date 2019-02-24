import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'

import { yearActive } from '../years/selectors'

import HelmetTitle from '../components/HelmetTitle'

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  year: yearActive(state)
})

export default connect(mapStateToProps)(HelmetTitle)
