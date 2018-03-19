import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import NewPasswordPage from '../NewPasswordPage';

const mockStore = configureMockStore();

describe('NewPasswordPage container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs'],
      },
      forms: {},
      texts: {
        list: {
          'about-festival-short': {
            valid: true,
          },
        },
      },
    });
    comp = shallow(<NewPasswordPage location={{ search: '?token=theToken' }} />, {
      context: { store },
    });
  });

  it('triggers form values set action on mount', () => {
    comp.dive();
    expect(store.getActions()).toEqual([
      {
        type: 'FORM_VALUES_SET',
        form: 'newPassword',
        values: {
          token: 'theToken',
        },
      },
    ]);
  });
});
