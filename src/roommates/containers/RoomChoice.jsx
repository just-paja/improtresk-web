import { connect } from 'react-redux'

import { roomListFetch } from '../actions'
import { getRoomChoice, getRoomListProgress } from '../selectors'

import RoomChoice from '../components/RoomChoice'
import mapProgressInline from '../../containers/mapProgressInline'

const mapStateToProps = state => ({
  room: getRoomChoice(state)
})

export default mapProgressInline(connect(mapStateToProps)(RoomChoice), {
  progressSelector: getRoomListProgress,
  onResourceChange: roomListFetch
})
