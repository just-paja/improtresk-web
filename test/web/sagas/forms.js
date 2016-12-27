import { expect } from 'chai';
import { fork, put, select, take } from 'redux-saga/effects';

import { getForm } from '../../../src/web/selectors/forms';
import { validateForm, validateFormOnValuesChange } from '../../../src/web/sagas/forms';

describe('Form saga helpers', () => {
  it('validateForm validates signup form as valid when everything is green', () => {
    const generator = validateFormOnValuesChange();

    expect(generator.next().value).to.eql(take('FORM_FIELD_CHANGE'));
    expect(generator.next({
      type: 'FORM_FIELD_CHANGE',
      form: 'test',
    }).value).to.eql(fork(validateForm, {
      type: 'FORM_FIELD_CHANGE',
      form: 'test',
    }));
  });
  it('validateForm skips validation if validator is missing', () => {
    const generator = validateForm({
      form: 'xkcd',
    });

    expect(generator.next().done).to.equal(true);
  });

  it('validateForm validates signup on FORM_FIELD_CHANGE', () => {
    const generator = validateForm({
      form: 'signup',
    });

    expect(generator.next().value).to.eql(select(getForm, 'signup'));
    expect(generator.next({
      values: {
        name: 'Přespříliš Žluťoučký Kůň',
        email: 'test@example.com',
        phone: '+420 632-157-987',
        dob: '1980-01-15',
        rules: true,
      },
    }).value).to.eql(put({
      type: 'FORM_VALUES_VALIDATE',
      form: 'signup',
      errors: {},
      valid: true,
    }));
    expect(generator.next().done).to.equal(true);
  });
});
