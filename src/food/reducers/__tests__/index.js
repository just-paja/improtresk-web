import reducers from '..';

describe('Food reducers', () => {
  it('provides list', () => {
    expect(Object.keys(reducers())).toContain('list');
  });
});
