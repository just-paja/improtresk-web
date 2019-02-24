import { connect } from 'react-redux'

import { getActiveOrder, getUnconfirmedOrder } from '../orders/selectors'
import { redirectHome } from '../participants/actions'

import ParticipantRegistration from './components/ParticipantRegistration'

const mapStateToProps = state => ({
  order: getActiveOrder(state) || getUnconfirmedOrder(state)
})

const mapDispatchToProps = {
  onExistingOrder: redirectHome
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantRegistration)
