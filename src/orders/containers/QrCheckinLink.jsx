import { connect } from 'react-redux'

import QrCheckinLink from '../components/QrCheckinLink'

const mapStateToProps = state => ({
  accessToken: state.session.data.access_token,
  apiUrl: state.session.apiSource
})

export default connect(mapStateToProps)(QrCheckinLink)
