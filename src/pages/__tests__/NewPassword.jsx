import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import NewPassword from '../NewPassword';

const mockStore = configureMockStore();

describe('NewPassword container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      forms: {},
      texts: {
        list: {
          'about-festival-short': {
            valid: true,
          },
        },
      },
    });
    comp = shallow(<NewPassword location={{ query: { token: 'theToken' } }} />, {
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
