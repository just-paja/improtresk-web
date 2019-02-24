import { connect } from 'react-redux'

import { getLang } from '../selectors'

import LinkContainer from '../components/LinkContainer'

const mapStateToProps = state => ({
  lang: getLang(state)
})

export default connect(mapStateToProps)(LinkContainer)
