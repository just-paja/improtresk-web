import reducers from '..';

describe('Orders reducers', () => {
  it('provide list', () => {
    expect(Object.keys(reducers())).toContain('list');
  });

  it('provide detail', () => {
    expect(Object.keys(reducers())).toContain('detail');
  });
});
