import { expect } from 'chai';

import { tipsAll } from '../../../src/web/selectors/tips';

describe('Tips selectors', () => {
  it('tipsAll returns all news stored', () => {
    expect(tipsAll({
      tips: {
        data: [
          { id: 1 },
        ],
      },
    })).to.eql([
      { id: 1 },
    ]);
  });
});
