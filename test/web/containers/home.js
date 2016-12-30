import configureMockStore from 'redux-mock-store';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Home from '../../../src/web/components/pages/home';
import HomeContainer from '../../../src/web/containers/home';

const mockStore = configureMockStore();

describe('Home container', () => {
  it('renders not ready when news nor years are ready', () => {
    const store = mockStore({
      news: {
        data: [],
        ready: false,
      },
      years: {
        data: [],
        ready: false,
      },
      texts: {},
    });

    expect(shallow(<HomeContainer store={store} />).node).to.eql(
      <Home
        about=""
        news={[]}
        onMount={() => {}}
        ready={false}
        store={store}
        year={null}
      />
    );
  });
  it('renders as ready when years and news are ready', () => {
    const store = mockStore({
      news: {
        data: [
          { id: 1, text: 'foo' },
        ],
        ready: true,
      },
      texts: {
        'about-festival-short': {
          data: {
            text: 'foo',
          },
          ready: true,
        },
      },
      years: {
        data: [
          { id: 1, year: '2015' },
        ],
        ready: true,
      },
    });

    expect(shallow(<HomeContainer store={store} />).node).to.eql(
      <Home
        about="foo"
        news={[
          { id: 1, text: 'foo' },
        ]}
        onMount={() => {}}
        ready
        store={store}
        year={{ id: 1, year: '2015' }}
      />
    );
  });
});
