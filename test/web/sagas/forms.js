import { expect } from 'chai';
import { put, select, takeLatest } from 'redux-saga/effects';

import signupValidator from '../../../src/web/forms/signup';

import { getForm } from '../../../src/web/selectors/forms';
import { validateForm, validateFormOnValuesChange, validateAndSubmitForm } from '../../../src/web/sagas/forms';

describe('Form saga helpers', () => {
  it('validateForm validates signup form as valid when everything is green', () => {
    const generator = validateFormOnValuesChange();

    expect(generator.next().value).to.eql(takeLatest('FORM_FIELD_CHANGE', validateForm));
    expect(generator.next().done).to.equal(true);
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
        rules_accepted: true,
      },
    }).value).to.eql(put({
      type: 'FORM_VALUES_VALIDATE',
      form: 'signup',
      errors: {},
      valid: true,
    }));
    expect(generator.next().done).to.equal(true);
  });
  it('validateAndSubmitForm validates and blocks invalid form submit', () => {
    const generator = validateAndSubmitForm({
      form: 'signup',
    });

    expect(generator.next().value).to.eql(select(getForm, 'signup'));
    expect(generator.next({
      valid: false,
      values: {
        dob: '1970-01-01',
        email: 'test@example.com',
        phone: '123456789',
        rules_accepted: true,
      },
    }).value).to.eql(signupValidator({
      dob: '1970-01-01',
      email: 'test@example.com',
      phone: '123456789',
      rules_accepted: true,
    }));
    expect(generator.next({ valid: false }).value).to.eql(put({
      type: 'FORM_SUBMIT_PREVENTED',
      form: 'signup',
      valid: false,
    }));
    expect(generator.next().done).to.equal(true);
  });
  it('validateAndSubmitForm validates and allows valid form submit', () => {
    const generator = validateAndSubmitForm({
      form: 'signup',
    });

    expect(generator.next().value).to.eql(select(getForm, 'signup'));
    expect(generator.next({
      valid: false,
      values: {
        dob: '1970-01-01',
        email: 'test@example.com',
        phone: '123456789',
        rules_accepted: true,
      },
    }).value).to.eql(signupValidator({
      dob: '1970-01-01',
      email: 'test@example.com',
      phone: '123456789',
      rules_accepted: true,
    }));
    expect(generator.next({ valid: true }).value).to.eql(put({
      type: 'FORM_SUBMIT_ALLOWED',
      form: 'signup',
      valid: true,
    }));
    expect(generator.next().done).to.equal(true);
  });
});
