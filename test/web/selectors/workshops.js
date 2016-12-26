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
      workshops: {
        data: [
          { id: 1 },
        ],
      },
    })).to.eql([
      { id: 1 },
    ]);
  });
  it('workshopsDetail returns detail of the stored workshop', () => {
    expect(workshopsDetail({
      workshopDetail: {
        data: {
          id: 1,
          name: 'foo',
        },
      },
    })).to.eql({
      id: 1,
      name: 'foo',
    });
  });
  it('shouldFetchList returns false when in invalid state', () => {
    expect(shouldFetchList({})).to.equal(false);
    expect(shouldFetchList({ workshops: {} })).to.equal(false);
    expect(shouldFetchList({ workshops: { valid: false } })).to.equal(false);
  });
  it('shouldFetchList returns true when in valid state', () => {
    expect(shouldFetchList({ workshops: { valid: true } })).to.equal(true);
  });
  it('shouldFetchDetail returns false when in invalid state', () => {
    expect(shouldFetchDetail({})).to.equal(false);
    expect(shouldFetchDetail({ workshopDetail: {} })).to.equal(false);
    expect(shouldFetchDetail({ workshopDetail: { valid: false } })).to.equal(false);
  });
  it('shouldFetchDetail returns true when in valid state', () => {
    expect(shouldFetchDetail({ workshopDetail: { valid: true } })).to.equal(true);
  });
});
