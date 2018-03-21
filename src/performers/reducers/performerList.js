import { combine } from 'react-saga-rest';

import createCollectionReducers, { initialState } from '../../reducers/createCollectionReducers';

import { performerListFetch } from '../actions';

export default combine(initialState, createCollectionReducers({
  routine: performerListFetch,
}));
