import createYearFetchSaga from '../../years/sagas/createYearFetchSaga';

import { mealListFetch } from '../actions';

export default createYearFetchSaga(mealListFetch);
