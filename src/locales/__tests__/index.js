import * as locales from '..';

describe('Global Locales', () => {
  it('provides cs language', () => {
    expect(locales).toHaveProperty('cs');
  });

  it('provides en language', () => {
    expect(locales).toHaveProperty('en');
  });
});
