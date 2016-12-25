import { expect } from 'chai';

import { currentConditions } from '../../../src/web/selectors/conditions';

describe('Conditions selectors', () => {
  it('currentConditions returns all news stored', () => {
    expect(currentConditions({
      conditions: {
        current: {
          data: {
            id: 1,
            text: 'foo',
          },
        },
      },
    })).to.eql({
      id: 1,
      text: 'foo',
    });
  });
});
