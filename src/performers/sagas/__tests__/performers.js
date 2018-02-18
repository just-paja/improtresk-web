import { call, select, takeLatest } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { yearActiveNumber } from '../../../years/selectors';
import {
  getPerformerDetailId,
  isPerformerListRequired,
  isPerformerDetailRequired,
} from '../../selectors';

import * as sagas from '../performers';
import * as api from '../../../api';

describe('Performers sagas', () => {
  it('requirePerformerList creates fetch actions', () => {
    const gen = sagas.requirePerformerList();
    expect(gen.next().value).toEqual(takeLatest(
      'PERFORMERS_REQUIRED',
      sagas.fetchPerformerList
    ));
    expect(gen.next().done).toBe(true);
  });

  it('requirePerformerDetail creates fetch actions', () => {
    const gen = sagas.requirePerformerDetail();
    expect(gen.next().value).toEqual(takeLatest(
      'PERFORMER_DETAIL_REQUIRED',
      sagas.fetchPerformerDetail
    ));
    expect(gen.next().done).toBe(true);
  });

  it('fetchPerformerList creates fetch actions with year', () => {
    const gen = sagas.fetchPerformerList();
    expect(gen.next().value).toEqual(select(yearActiveNumber));
    expect(gen.next('2017').value).toEqual(call(
      fetchResourceIfRequired,
      api.fetchPerformers,
      {
        isRequired: isPerformerListRequired,
        actions: {
          start: 'PERFORMERS_FETCH_STARTED',
          success: 'PERFORMERS_FETCH_SUCCESS',
          fail: 'PERFORMERS_FETCH_ERROR',
        },
        params: {
          year: '2017',
        },
      })
    );
    expect(gen.next().done).toBe(true);
  });

  it('fetchPerformerList creates no actions without year', () => {
    const gen = sagas.fetchPerformerList();
    expect(gen.next().value).toEqual(select(yearActiveNumber));
    expect(gen.next(null).done).toBe(true);
  });

  it('fetchPerformerDetail creates fetch actions with year', () => {
    const gen = sagas.fetchPerformerDetail();
    expect(gen.next().value).toEqual(select(yearActiveNumber));
    expect(gen.next('2017').value).toEqual(select(getPerformerDetailId));
    expect(gen.next(24).value).toEqual(call(
      fetchResourceIfRequired,
      api.fetchPerformerDetail,
      {
        isRequired: isPerformerDetailRequired,
        actions: {
          start: 'PERFORMER_DETAIL_FETCH_STARTED',
          success: 'PERFORMER_DETAIL_FETCH_SUCCESS',
          fail: 'PERFORMER_DETAIL_FETCH_ERROR',
        },
        params: {
          year: '2017',
          performer: 24,
        },
      })
    );
    expect(gen.next().done).toBe(true);
  });

  it('fetchPerformerDetail creates no actions without year', () => {
    const gen = sagas.fetchPerformerDetail();
    expect(gen.next().value).toEqual(select(yearActiveNumber));
    expect(gen.next(null).value).toEqual(select(getPerformerDetailId));
    expect(gen.next(null).done).toBe(true);
  });
});
