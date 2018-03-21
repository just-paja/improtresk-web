import validator from '../../validator';

import { boolField } from '..';

const form = validator({
  properties: {
    testField: boolField(),
  },
});

describe('boolField validator', () => {
  it('returns no error message when values contain true', () => {
    expect(form({ testField: true })).toEqual({});
  });

  it('returns empty error message when values contain false', () => {
    expect(form({ testField: false })).toEqual({
      testField: 'forms.fieldRequired',
    });
  });
});
