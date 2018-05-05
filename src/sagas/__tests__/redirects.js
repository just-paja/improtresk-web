import { push } from 'react-router-redux';

import getSagaTester from '../../../mock/sagaTester';

import * as sagas from '../redirects';

describe('redirect sagas', () => {
  it('redirectHome triggers redirect home', () => {
    const sagaTester = getSagaTester({});
    sagaTester.start(sagas.redirectHome);
    expect(sagaTester.getCalledActions()).toContainEqual(
      expect.objectContaining({
        payload: {
          method: 'push',
          args: ['/cs/ucastnik'],
        },
      })
    );
  });

  it('redirectSignup triggers redirect to signup', () => {
    const sagaTester = getSagaTester({});
    sagaTester.start(sagas.redirectSignup);
    expect(sagaTester.getCalledActions()).toContainEqual(
      expect.objectContaining({
        payload: {
          method: 'push',
          args: ['/cs/prihlaska'],
        },
      })
    );
  });

  it('redirectToEntryPath redirects to participant home when entry path is not provided', () => {
    const sagaTester = getSagaTester({});
    sagaTester.start(sagas.redirectToEntryPath);
    expect(sagaTester.getCalledActions()).toContainEqual(push('/cs/ucastnik'));
  });

  it('redirectToEntryPath redirects to entry path when provided', () => {
    const sagaTester = getSagaTester({
      session: {
        loginRedirect: '/asdfasdf',
      },
    });
    sagaTester.start(sagas.redirectToEntryPath);
    expect(sagaTester.getCalledActions()).toContainEqual(push('/asdfasdf'));
  });
});
