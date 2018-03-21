import { combine } from 'react-saga-rest';
import { newsDetailFetch } from '../actions';

import createFetchReducers, { initialState } from '../../reducers/createFetchReducers';

export default combine(initialState, createFetchReducers({
  routine: newsDetailFetch,
  identAttr: 'id',
}));
