import createFetchSaga from '../../sagas/createFetchSaga';

import { newsListFetch } from '../actions';

export default createFetchSaga(newsListFetch);
