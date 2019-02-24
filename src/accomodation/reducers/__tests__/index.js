import reducers from '..'

describe('Accomodation reducers', () => {
  it('provides list', () => {
    expect(Object.keys(reducers())).toContain('list')
  })
})
