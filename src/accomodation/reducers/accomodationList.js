import { combine } from 'react-saga-rest';

import { accomodationListFetch } from '../actions';

import createCollectionReducers, { initialState } from '../../reducers/createCollectionReducers';

export default combine(initialState, createCollectionReducers({
  routine: accomodationListFetch,
}));
