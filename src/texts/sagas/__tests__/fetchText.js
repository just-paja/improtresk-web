import { all, call, fork, select } from 'redux-saga/effects';

import { fetchResourceIfRequired } from '../../../sagas/api';
import { getLang } from '../../../selectors/locales';

import * as sagas from '..';
import * as api from '../../../api';

describe('Text sagas', () => {
  it('fetchTextsIfRequired forks fetchTextsIfRequired for all texts', () => {
    const gen = sagas.fetchTextsIfRequired(
      ['foo', 'bar']
    );

    expect(gen.next().value).toEqual(all([
      fork(sagas.fetchTextIfRequired, 'foo'),
      fork(sagas.fetchTextIfRequired, 'bar'),
    ]));
  });

  it('fetchTextIfRequired forks fetchResourceIfRequired for all texts', () => {
    const gen = sagas.fetchTextIfRequired('foo');
    expect(gen.next().value).toMatchObject(select(getLang));
    expect(gen.next('cs').value).toMatchObject(call(
      fetchResourceIfRequired,
      api.fetchText,
      {
        actions: {
          start: 'TEXT_FETCH_STARTED',
          success: 'TEXT_FETCH_SUCCESS',
          fail: 'TEXT_FETCH_ERROR',
        },
        params: {
          category: 'foo',
          lang: 'cs',
        },
        actionData: {
          category: 'foo',
          lang: 'cs',
        },
      }
    ));
  });
});
