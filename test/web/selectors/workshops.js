import { expect } from 'chai';

import { workshopsAll, workshopsDetail } from '../../../src/web/selectors/workshops';

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
  it('workshopsDetail returns detail of the stored workshop', () => {
    expect(workshopsDetail({
      workshopDetail: {
        data: {
          id: 1,
          name: 'foo',
        },
      },
    })).to.eql({
      id: 1,
      name: 'foo',
    });
  });
});
