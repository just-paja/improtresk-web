import reducer from '..';

describe('Schedule Reducers module', () => {
  it('provides events reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('events');
  });
});
