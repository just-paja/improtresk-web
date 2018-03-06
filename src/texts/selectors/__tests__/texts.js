import * as selectors from '../texts';

describe('Texts selectors', () => {
  it('getTextState returns null when text list does not exist', () => {
    expect(selectors.getTextState('foo')({
      texts: {},
    })).toEqual(null);
  });

  it('getTextState returns null when text does not exist', () => {
    expect(selectors.getTextState('foo')({
      texts: {
        list: {
        },
      },
    })).toEqual(null);
  });

  it('getTextState returns state of specified text', () => {
    expect(selectors.getTextState('foo')({
      texts: {
        list: {
          foo: 'bar',
        },
      },
    })).toEqual('bar');
  });

  it('getText returns null when text state does not exist', () => {
    expect(selectors.getText('foo')({
      texts: {
        list: {},
      },
    })).toEqual([]);
  });

  it('getText returns null when text state does not have data', () => {
    expect(selectors.getText('foo')({
      texts: {
        list: {
          foo: {},
        },
      },
    })).toEqual([]);
  });

  it('getText returns null when text state data do not have text', () => {
    expect(selectors.getText('foo')({
      texts: {
        list: {
          foo: {
            data: {},
          },
        },
      },
    })).toEqual({});
  });

  it('getText returns text when it exists and is populated', () => {
    expect(selectors.getText('foo')({
      texts: {
        list: {
          foo: {
            data: {
              text: 'a message',
            },
          },
        },
      },
    })).toEqual({ text: 'a message' });
  });

  it('getTextProgress returns progress missing text', () => {
    expect(selectors.getTextProgress('foo')({
      texts: {
        list: {
        },
      },
    })).toMatchObject({
      loading: false,
      valid: false,
    });
  });

  it('getTextProgress returns progress of single text', () => {
    expect(selectors.getTextProgress('foo')({
      texts: {
        list: {
          foo: {
            valid: false,
            loading: true,
          },
        },
      },
    })).toMatchObject({
      loading: true,
    });
  });

  it('getTextProgress returns progress of multiple texts', () => {
    expect(selectors.getTextProgress('foo', 'bar')({
      texts: {
        list: {
          foo: {
            valid: true,
            loading: false,
          },
          bar: {
            valid: false,
            loading: true,
          },
        },
      },
    })).toMatchObject({
      valid: false,
      loading: true,
    });
  });

  it('isTextRequired returns true when text state does not exist', () => {
    expect(selectors.isTextRequired('foo')({
      texts: {
        list: {},
      },
    })).toBe(true);
  });

  it('isTextRequired returns true when text is not valid and not loading', () => {
    expect(selectors.isTextRequired('foo')({
      texts: {
        list: {
          foo: {
            valid: false,
            loading: false,
          },
        },
      },
    })).toBe(true);
  });
});
