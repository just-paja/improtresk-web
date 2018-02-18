import * as selectors from '..';

describe('Home page selectors', () => {
  it('getHomeProgress returns year and news progress', () => {
    expect(selectors.getHomeProgress({
      news: {
        list: {
          data: [],
          loading: false,
        },
      },
      years: {
        list: {
          data: [],
          loading: true,
        },
      },
      texts: {
        list: {
          'about-festival-short': {
            valid: true,
          },
        },
      },
    })).toMatchObject({
      loading: true,
    });
  });
});
