import { connect } from 'react-redux'

import { getLang } from '../selectors'

import Link from '../components/Link'

const mapStateToProps = state => ({
  lang: getLang(state)
})

export default connect(mapStateToProps)(Link)
