import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/performers';

describe('Performer transformers', () => {
  it('aggregatePerformerFrontImage returns null without data', () => {
    expect(transformers.aggregatePerformerFrontImage([])).to.eql(null);
  });
  it('aggregatePerformerFrontImage returns first image url', () => {
    expect(transformers.aggregatePerformerFrontImage([
      { image: 'foo' },
    ])).to.eql('foo');
  });
  it('aggregatePerformerData does nothing without photos', () => {
    const performer = {
      id: 5,
      name: 'Gloryhammer',
    };
    expect(transformers.aggregatePerformerData(performer)).to.equal(performer);
  });
  it('aggregatePerformerData aggregates front image', () => {
    const performer = {
      id: 5,
      name: 'Gloryhammer',
      photos: [],
    };
    expect(transformers.aggregatePerformerData(performer)).to.eql({
      frontImage: null,
      id: 5,
      name: 'Gloryhammer',
      photos: [],
    });
  });
});
