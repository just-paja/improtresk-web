import { expect } from 'chai';

import { getText, readyTexts } from '../../../src/web/selectors/texts';

describe('Texts selectors', () => {
  it('getText returns a specific text', () => {
    expect(getText({
      texts: {},
    }, 'foo')).to.equal('');

    expect(getText({
      texts: {
        foo: {
          ready: false,
        },
      },
    }, 'foo')).to.equal('');

    expect(getText({
      texts: {
        foo: {
          ready: false,
          data: {
            text: 'bar',
          },
        },
      },
    }, 'foo')).to.equal('bar');
  });

  it('readyTexts returns false when none of specified texts are ready', () => {
    expect(readyTexts({
      texts: {},
    }, ['foo'])).to.equal(false);

    expect(readyTexts({
      texts: {
        foo: { },
      },
    }, ['foo'])).to.equal(false);

    expect(readyTexts({
      texts: {
        foo: { ready: false },
        bar: { ready: false },
      },
    }, ['foo', 'bar'])).to.equal(false);
  });

  it('readyTexts returns false when one of two specified texts is ready', () => {
    expect(readyTexts({
      texts: {
        foo: { ready: false },
        bar: { ready: true },
      },
    }, ['foo', 'bar'])).to.equal(false);
  });

  it('readyTexts returns true when all of specified texts are ready', () => {
    expect(readyTexts({
      texts: {
        foo: { ready: true },
        bar: { ready: true },
      },
    }, ['foo', 'bar'])).to.equal(true);
  });
});
