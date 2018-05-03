import { connect } from 'react-redux';

import { roomJoin, roomLeave, roomListFetch } from '../actions';
import { getParticipantId } from '../../participants/selectors';
import {
  getRoomList,
  getRoomListProgress,
  getRoomChoice,
  getRoomSelection,
  isRoomSelectionLoading,
} from '../selectors';

import RoomPicker from '../components/RoomPicker';
import mapProgressInline from '../../containers/mapProgressInline';

const mapStateToProps = state => ({
  loading: isRoomSelectionLoading(state),
  participant: getParticipantId(state),
  rooms: getRoomList(state),
  savedRoom: getRoomChoice(state),
  selectedRoom: getRoomSelection(state),
});

const mapDispatchProp = {
  onJoin: roomJoin,
  onLeave: roomLeave,
};

export default mapProgressInline(connect(mapStateToProps, mapDispatchProp)(RoomPicker), {
  progressSelector: getRoomListProgress,
  onResourceChange: roomListFetch,
});
