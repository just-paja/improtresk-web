import * as fields from '..';

describe('Form validators', () => {
  it('provides boolField', () => {
    expect(fields).toHaveProperty('boolField');
  });

  it('provides dateField', () => {
    expect(fields).toHaveProperty('dateField');
  });

  it('provides dateOfBirthField', () => {
    expect(fields).toHaveProperty('dateOfBirthField');
  });

  it('provides emailField', () => {
    expect(fields).toHaveProperty('emailField');
  });

  it('provides humanNameField', () => {
    expect(fields).toHaveProperty('humanNameField');
  });

  it('provides passwordField', () => {
    expect(fields).toHaveProperty('passwordField');
  });

  it('provides phoneField', () => {
    expect(fields).toHaveProperty('phoneField');
  });

  it('provides textField', () => {
    expect(fields).toHaveProperty('textField');
  });
});
