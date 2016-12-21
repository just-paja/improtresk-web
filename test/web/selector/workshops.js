import { expect } from 'chai';

import { workshopsAll } from '../../../src/web/selectors/workshops';

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
});
