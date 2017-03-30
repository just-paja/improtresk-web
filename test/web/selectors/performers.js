import sinon from 'sinon';

import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/performers';

import {
  getPerformerDetail,
  getPerformerDetailId,
  getPerformers,
  shouldFetchDetail,
  shouldFetchPerformers,
} from '../../../src/web/selectors/performers';

describe('Performer selectors', () => {
  beforeEach(() => {
    sinon.stub(transformers, 'aggregatePerformerData');
  });
  afterEach(() => {
    transformers.aggregatePerformerData.restore();
  });

  it('shouldFetchPerformers returns true when valid', () => {
    expect(shouldFetchPerformers({
      performers: {
        list: {
          valid: true,
        },
      },
    })).to.equal(true);
  });
  it('shouldFetchPerformers returns false when invalid', () => {
    expect(shouldFetchPerformers({
      performers: {
        list: {
          valid: false,
        },
      },
    })).to.equal(false);
  });
  it('shouldFetchDetail returns true when valid and selected id matches data id', () => {
    expect(shouldFetchDetail({
      performers: {
        detail: {
          valid: true,
          id: 4,
          data: {
            id: 4,
          },
        },
      },
    })).to.equal(true);
  });
  it('shouldFetchDetail returns false when invalid', () => {
    expect(shouldFetchDetail({
      performers: {
        detail: {
          valid: false,
          data: {},
        },
      },
    })).to.equal(false);
  });
  it('shouldFetchDetail returns false when valid but selected id is not matching data id', () => {
    expect(shouldFetchDetail({
      performers: {
        detail: {
          valid: true,
          id: 5,
          data: {
            id: 4,
          },
        },
      },
    })).to.equal(false);
  });
  it('getPerformers returns aggregated performers data', () => {
    transformers.aggregatePerformerData.returns('foo');
    const data = [
      { id: 5 },
      { id: 6 },
    ];
    expect(getPerformers({
      performers: {
        list: { data },
      },
    })).to.eql(['foo', 'foo']);
    expect(transformers.aggregatePerformerData.args).to.eql([
      [{ id: 5 }, 0, data],
      [{ id: 6 }, 1, data],
    ]);
  });
  it('getPerformerDetail returns aggregated performers data', () => {
    transformers.aggregatePerformerData.returns('foo');
    expect(getPerformerDetail({
      performers: {
        detail: {
          data: { id: 5 },
        },
      },
    })).to.eql('foo');
    expect(transformers.aggregatePerformerData.args).to.eql([
      [{ id: 5 }],
    ]);
  });
  it('getPerformerDetailId returnsd detail selected id', () => {
    expect(getPerformerDetailId({
      performers: {
        detail: {
          id: 7,
        },
      },
    })).to.equal(7);
  });
});
