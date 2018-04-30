import createYearFetchSaga from '../../years/sagas/createYearFetchSaga';

import { mealListFetch } from '../actions';
import { getMealListState } from '../selectors';

export default createYearFetchSaga(mealListFetch, {
  stateSelector: getMealListState,
});
