import configureMockStore from 'redux-mock-store';
import React from 'react';

import { shallow } from 'enzyme';

import ChangePasswordPage from '../ChangePasswordPage';

const mockStore = configureMockStore();

describe('ChangePasswordPage container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: [],
      },
    });
    comp = shallow(<ChangePasswordPage />, {
      context: { store },
    });
  });

  it('provides translate method', () => {
    expect(comp.find('ChangePasswordPage')).toHaveProp('translate');
  });
});
