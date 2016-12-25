import { expect } from 'chai';

import { newsAll } from '../../../src/web/selectors/news';

describe('News selectors', () => {
  it('newsAll returns all news stored', () => {
    expect(newsAll({
      news: {
        data: [
          { id: 1 },
        ],
      },
    })).to.eql([
      { id: 1 },
    ]);
  });
});
