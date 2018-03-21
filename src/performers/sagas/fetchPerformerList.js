import createYearFetchSaga from '../../years/sagas/createYearFetchSaga';

import { performerListFetch } from '../actions';

export default createYearFetchSaga(performerListFetch);
