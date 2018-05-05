import { createSelector } from 'reselect';
import { getProgress, getProp, transformData } from 'react-saga-rest';

import { getParticipantDetail } from '../../participants/selectors';

const aggregateJoinedStatus = (room, participant) => ({
  ...room,
  joined: room.inhabitants && room.inhabitants.filter(
    inhabitant => inhabitant.participant_id === participant.id
  ).length !== 0,
});

const aggregateFullStatus = room => ({
  ...room,
  full: room.inhabitants.length >= room.size,
});

export const getRoomListState = state => state.roommates.rooms;
export const getRoomListProgress = getProgress(getRoomListState);
export const getRoomList = transformData(getRoomListState, {
  transformers: [
    {
      select: getParticipantDetail,
      transform: aggregateJoinedStatus,
    },
    {
      transform: aggregateFullStatus,
    },
  ],
  sort: (a, b) => {
    if (a.full && !b.full) {
      return 1;
    }
    if (!a.full && b.full) {
      return -1;
    }
    return 0;
  },
});

export const getRoomChoice = createSelector(
  getRoomList,
  rooms => rooms.find(room => room.joined)
);

export const getRoomSelectionState = state => state.roommates.roomSelection;
export const getRoomSelection = getProp(getRoomSelectionState, 'room');
export const isRoomSelectionLoading = getProp(getRoomSelectionState, 'loading');
