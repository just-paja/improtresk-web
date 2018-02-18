import reducers from '../';


describe('Performers reducers', () => {
  it('provide detail', () => {
    expect(Object.keys(reducers())).toContain('detail');
  });

  it('provide list', () => {
    expect(Object.keys(reducers())).toContain('list');
  });
});
