import { expect } from 'chai';

import {
  newsAll,
  getNewsDetail,
  shouldFetchDetail,
} from '../../../src/web/selectors/news';

describe('News selectors', () => {
  it('getNewsDetail returns all news stored', () => {
    expect(getNewsDetail({
      news: {
        detail: {
          data: { id: 1 },
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
