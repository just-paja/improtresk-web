import sinon from 'sinon';

import { newsDetailFetch } from '../../actions';

import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

describe('newsDetail saga', () => {
  beforeEach(() => {
    sinon.stub(newsDetailFetch, 'resource');
  });

  afterEach(() => {
    newsDetailFetch.resource.restore();
  });

  it('fetches news from API', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(newsDetailFetch());
    expect(newsDetailFetch.resource.calledOnce).toBeTruthy();
  });
});
