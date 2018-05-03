import * as api from '../../api';
import * as constants from '../constants';

import { createRoutine } from '../../routines';

export const roomJoin = createRoutine(constants.ROOMMATES_ROOM_JOIN, api.roomJoin);
export const roomLeave = createRoutine(constants.ROOMMATES_ROOM_LEAVE, api.roomLeave);
export const roomListFetch = createRoutine(constants.ROOMMATES_ROOM_LIST_FETCH, api.roomListFetch);
