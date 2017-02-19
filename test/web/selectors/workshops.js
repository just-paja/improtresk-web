import { expect } from 'chai';

import {
  workshopsAll,
  workshopsDetail,
  shouldFetchList,
  shouldFetchDetail,
} from '../../../src/web/selectors/workshops';

describe('Workshops selectors', () => {
  it('workshopsAll returns all workshops stored', () => {
    expect(workshopsAll({
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      workshops: {
        difficulties: {
          data: [],
        },
        list: {
          data: [
            {
              id: 1,
              lectors: [],
            },
          ],
        },
      },
    })).to.eql([
      {
        id: 1,
        difficulty: null,
        lectors: [],
      },
    ]);
  });
  it('workshopsDetail returns detail of the stored workshop', () => {
    expect(workshopsDetail({
      lectors: {
        list: {
          data: [],
        },
        roles: {
          data: [],
        },
      },
      workshops: {
        detail: {
          data: {
            id: 1,
            name: 'foo',
            lectors: [],
          },
        },
        difficulties: {
          data: [],
        },
      },
    })).to.eql({
      id: 1,
      difficulty: null,
      name: 'foo',
      lectors: [],
    });
  });
  it('shouldFetchList returns false when in invalid state', () => {
    expect(shouldFetchList({ workshops: { } })).to.equal(false);
    expect(shouldFetchList({ workshops: { list: {} } })).to.equal(false);
    expect(shouldFetchList({ workshops: { list: { valid: false } } })).to.equal(false);
  });
  it('shouldFetchList returns true when in valid state', () => {
    expect(shouldFetchList({ workshops: { list: { valid: true } } })).to.equal(true);
  });
  it('shouldFetchDetail returns false when in invalid state', () => {
    expect(shouldFetchDetail({ workshops: { } })).to.equal(false);
    expect(shouldFetchDetail({ workshops: { detail: {} } })).to.equal(false);
    expect(shouldFetchDetail({ workshops: { detail: { valid: false } } })).to.equal(false);
  });
  it('shouldFetchDetail returns true when in valid state', () => {
    expect(shouldFetchDetail({
      workshops: {
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
