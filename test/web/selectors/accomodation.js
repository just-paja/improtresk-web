import { expect } from 'chai';

import { accomodationAll } from '../../../src/web/selectors/accomodation';

describe('Accomodation selectors', () => {
  it('accomodationAll returns all news stored', () => {
    expect(accomodationAll({
      accomodation: {
        data: [
          { id: 1 },
        ],
      },
    })).to.eql([
      { id: 1 },
    ]);
  });
});
