import { connect } from 'react-redux'

import { getLang } from '../selectors'

import MultiLingualMarkdown from '../components/MultiLingualMarkdown'

const mapStateToProps = state => ({
  lang: getLang(state)
})

export default connect(mapStateToProps)(MultiLingualMarkdown)
