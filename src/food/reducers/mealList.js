import { combine } from 'react-saga-rest';
import { mealListFetch } from '../actions';

import createCollectionReducers, { initialState } from '../../reducers/createCollectionReducers';

export default combine(initialState, createCollectionReducers({
  routine: mealListFetch,
}));
