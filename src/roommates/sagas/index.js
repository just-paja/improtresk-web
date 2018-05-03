import fetchRoomList from './fetchRoomList';
import roomJoin from './roomJoin';
import roomLeave from './roomLeave';

export default [
  ...fetchRoomList,
  ...roomJoin,
  ...roomLeave,
];
