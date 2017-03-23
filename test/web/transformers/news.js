import sinon from 'sinon';

import { expect } from 'chai';

import * as transformersPoll from '../../../src/web/transformers/polls';
import * as transformers from '../../../src/web/transformers/news';

describe('News transformers', () => {
  beforeEach(() => {
    sinon.stub(transformersPoll, 'aggregatePollData');
  });

  afterEach(() => {
    transformersPoll.aggregatePollData.restore();
  });

  it('aggregateNewsData aggregates poll data', () => {
    transformersPoll.aggregatePollData.returns({ id: 1 });
    const poll = {
      id: 634,
      answers: [
        {
          id: 6,
          text: 'Answer text',
        },
      ],
    };

    expect(transformers.aggregateNewsData({
      id: 5,
      text: 'Answer text',
      poll,
    })).to.eql({
      id: 5,
      text: 'Answer text',
      poll: { id: 1 },
    });
    expect(transformersPoll.aggregatePollData.args).to.eql([
      [poll],
    ]);
  });
  it('aggregateNewsData does nothing without poll', () => {
    const news = {
      id: 5,
      text: 'Answer text',
    };
    expect(transformers.aggregateNewsData(news)).to.equal(news);
  });
});
