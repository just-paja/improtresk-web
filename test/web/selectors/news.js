import sinon from 'sinon';

import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/news';

import {
  newsAll,
  getNewsDetail,
  getNewsDetailId,
  shouldFetchDetail,
} from '../../../src/web/selectors/news';

describe('News selectors', () => {
  beforeEach(() => {
    sinon.stub(transformers, 'aggregateNewsData');
  });

  afterEach(() => {
    transformers.aggregateNewsData.restore();
  });

  it('getNewsDetail returns selected news detail id', () => {
    expect(getNewsDetailId({
      news: {
        detail: {
          id: 1,
        },
      },
    })).to.equal(1);
  });
  it('getNewsDetail returns all news stored', () => {
    transformers.aggregateNewsData.returns({ id: 1 });
    expect(getNewsDetail({
      news: {
        detail: {
          data: {
            id: 1,
          },
        },
      },
    })).to.eql({ id: 1 });
  });
  it('newsAll returns all news stored', () => {
    expect(newsAll({
      news: {
        list: {
          data: [
            { id: 1 },
          ],
        },
      },
    })).to.eql([
      { id: 1 },
    ]);
  });
  it('shouldFetchDetail returns false when in invalid state', () => {
    expect(shouldFetchDetail({ news: { } })).to.equal(false);
    expect(shouldFetchDetail({ news: { detail: {} } })).to.equal(false);
    expect(shouldFetchDetail({
      news: { locations: { valid: false } },
    })).to.equal(false);
  });
  it('shouldFetchDetail returns true when in valid state', () => {
    expect(shouldFetchDetail({
      news: {
        detail: {
          id: 1,
          data: {
            id: 1,
          },
          valid: true,
        },
      },
    })).to.equal(true);
  });
});
