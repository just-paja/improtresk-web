import { combine, invalidate } from 'react-saga-rest';

import {
  foodChange,
  orderCancel,
  orderConfirm,
  orderCreate,
  orderChange,
  orderListFetch,
} from '../actions';
import { PARTICIPANT_LOGOUT } from '../../participants/constants';

import createCollectionReducers from '../../reducers/createCollectionReducers';

const defaultState = {
  data: [],
  loading: false,
};

export default combine(defaultState, {
  ...createCollectionReducers({
    routine: orderListFetch,
  }),
  [orderCancel.SUCCESS]: invalidate,
  [orderConfirm.SUCCESS]: invalidate,
  [orderCreate.SUCCESS]: invalidate,
  [orderChange.SUCCESS]: invalidate,
  [foodChange.SUCCESS]: invalidate,
  [PARTICIPANT_LOGOUT]: invalidate,
});
