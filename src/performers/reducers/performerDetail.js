import { combine } from 'react-saga-rest';

import createFetchReducers, { initialState } from '../../reducers/createFetchReducers';

import { performerDetailFetch } from '../actions';

export default combine(initialState, createFetchReducers({
  routine: performerDetailFetch,
  identAttr: 'id',
}));
