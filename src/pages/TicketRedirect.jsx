import { connect } from 'react-redux'

import TicketRedirect from './components/TicketRedirect'

const mapStateToProps = state => ({
  accessToken: state.session.data.access_token,
  apiUrl: state.session.apiSource
})

export default connect(mapStateToProps)(TicketRedirect)
