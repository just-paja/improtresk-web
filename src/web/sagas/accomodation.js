import { takeLatest } from 'redux-saga';

import { fetchResourceIfNeeded } from './common';

import * as api from '../../api';
import * as constants from '../constants/actions';

export function* fetchAccomodationOnMount() {
  yield* takeLatest(
    constants.ACCOMODATION_MOUNTED,
    fetchResourceIfNeeded,
    api.fetchAccomodation,
    state => state.accomodation.valid,
    {
      onStart: constants.ACCOMODATION_FETCH_STARTED,
      onSuccess: constants.ACCOMODATION_FETCH_SUCCESS,
      onError: constants.ACCOMODATION_FETCH_ERROR,
    }
  );
}

export default [
  fetchAccomodationOnMount,
];
