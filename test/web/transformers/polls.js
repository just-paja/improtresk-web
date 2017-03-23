import { expect } from 'chai';

import * as transformers from '../../../src/web/transformers/polls';

describe('Poll transformers', () => {
  it('aggregatePollAnswerData aggregates performer data in poll answer', () => {
    expect(transformers.aggregatePollAnswerData({
      id: 5,
      text: 'Answer text',
      performer: {
        text: 'foo',
        links: [
          {
            id: 78,
            name: 'Channel',
            service: 'youtube',
          },
        ],
        photos: [
          {
            id: 7,
            image: 'http://example.com/performer.jpg',
          },
        ],
      },
    })).to.eql({
      id: 5,
      description: 'foo',
      text: 'Answer text',
      image: 'http://example.com/performer.jpg',
      links: [
        {
          id: 78,
          name: 'Channel',
          service: 'youtube',
        },
      ],
      performer: null,
    });
  });
  it('aggregatePollAnswerData does not change answer with no performer', () => {
    const answer = {
      id: 6,
      text: 'Answer text',
    };
    expect(transformers.aggregatePollAnswerData(answer)).to.equal(answer);
  });
  it('aggregatePollData calls aggregatePollAnswerData on each answer', () => {
    expect(transformers.aggregatePollData({
      id: 634,
      answers: [
        {
          id: 5,
          text: 'Answer text',
          performer: {
            text: 'foo',
            links: [
              {
                id: 78,
                name: 'Channel',
                service: 'youtube',
              },
            ],
            photos: [
              {
                id: 7,
                image: 'http://example.com/performer.jpg',
              },
            ],
          },
        },
        {
          id: 6,
          text: 'Answer text',
        },
      ],
    })).to.eql({
      id: 634,
      answers: [
        {
          description: 'foo',
          id: 5,
          text: 'Answer text',
          image: 'http://example.com/performer.jpg',
          links: [
            {
              id: 78,
              name: 'Channel',
              service: 'youtube',
            },
          ],
          performer: null,
        },
        {
          id: 6,
          text: 'Answer text',
        },
      ],
    });
  });
});
