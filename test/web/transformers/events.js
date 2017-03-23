import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/events';

describe('Event transformers', () => {
  it('aggregateWorkshops filters out unknown workshops', () => {
    expect(transformers.aggregateWorkshops([1, 2], [])).to.eql([]);
  });
  it('aggregateWorkshops aggregates workshop data', () => {
    expect(transformers.aggregateWorkshops([1], [
      {
        id: 1,
        name: 'Air Walk',
      },
    ])).to.eql([
      {
        id: 1,
        name: 'Air Walk',
      },
    ]);
  });
  it('aggregatePerformer returns first image url', () => {
    expect(transformers.aggregatePerformer(1, [])).to.equal(null);
  });
  it('aggregatePerformer returns first image url', () => {
    expect(transformers.aggregatePerformer(1, [
      {
        id: 1,
        name: 'foo',
      },
    ])).to.eql({
      id: 1,
      name: 'foo',
    });
  });
  it('aggregateEventData aggregates workshops and performers', () => {
    expect(transformers.aggregateEventData([], [])({
      id: 5,
      performer: 12,
      workshops: [6],
    })).to.eql({
      id: 5,
      performer: null,
      workshops: [],
    });
  });
});
