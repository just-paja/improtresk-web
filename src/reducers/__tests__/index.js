import reducer from '..';

describe('Global Reducers module', () => {
  it('provides accomodation reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('accomodation');
  });

  it('provides device reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('device');
  });

  it('provides locale reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('locale');
  });

  it('provides news reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('news');
  });

  it('provides participants reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('participants');
  });

  it('provides routing reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('routing');
  });

  it('provides server reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('server');
  });

  it('provides session reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('session');
  });

  it('provides texts reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('texts');
  });

  it('provides workshops reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('workshops');
  });

  it('provides years reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('years');
  });
});
