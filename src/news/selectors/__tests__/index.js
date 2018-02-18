import * as selectors from '../index';

describe('News selectors', () => {
  it('getNewsDetail returns selected news detail id', () => {
    expect(selectors.getNewsDetailId({
      news: {
        detail: {
          id: 1,
        },
      },
    })).toBe(1);
  });

  it('getNewsDetail returns all news stored', () => {
    expect(selectors.getNewsDetail({
      news: {
        detail: {
          data: {
            id: 1,
          },
        },
      },
    })).toEqual({ id: 1 });
  });

  it('getNewsList returns all news stored', () => {
    expect(selectors.getNewsList({
      news: {
        list: {
          data: [
            { id: 1 },
          ],
        },
      },
    })).toEqual([
      { id: 1 },
    ]);
  });

  it('isNewsDetailRequired returns true when in invalid state', () => {
    expect(selectors.isNewsDetailRequired({
      news: { detail: { valid: false } },
    })).toBe(true);
  });

  it('isNewsDetailRequired returns false when in valid state', () => {
    expect(selectors.isNewsDetailRequired({
      news: {
        detail: {
          id: 1,
          data: {
            id: 1,
          },
          valid: true,
        },
      },
    })).toBe(false);
  });

  it('aggregateNewsData aggregates poll data', () => {
    const poll = {
      id: 634,
      answers: [
        {
          id: 6,
          text: 'Answer text',
        },
      ],
    };

    expect(selectors.aggregateNewsData({
      id: 5,
      text: 'Answer text',
      poll,
    })).toEqual({
      id: 5,
      text: 'Answer text',
      poll: {
        id: 634,
        answers: [
          {
            id: 6,
            text: 'Answer text',
          },
        ],
      },
    });
  });

  it('aggregateNewsData does nothing without poll', () => {
    const news = {
      id: 5,
      text: 'Answer text',
    };
    expect(selectors.aggregateNewsData(news)).toBe(news);
  });

  it('aggregatePollAnswerData aggregates performer data in poll answer', () => {
    expect(selectors.aggregatePollAnswerData({
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
    })).toEqual({
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

  it('aggregatePollAnswerData aggregates null for performer without photos', () => {
    expect(selectors.aggregatePollAnswerData({
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
        photos: [],
      },
    })).toEqual({
      id: 5,
      description: 'foo',
      text: 'Answer text',
      image: null,
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
    expect(selectors.aggregatePollAnswerData(answer)).toBe(answer);
  });

  it('aggregatePollData calls aggregatePollAnswerData on each answer', () => {
    expect(selectors.aggregatePollData({
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
    })).toEqual({
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
