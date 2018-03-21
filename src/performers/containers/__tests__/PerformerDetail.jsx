import React from 'react';
import configureStore from 'redux-mock-store';

import { shallow } from 'enzyme';

import { performerDetailFetch } from '../../actions';

import PerformerDetail from '../PerformerDetail';

const mockStore = configureStore();

describe('PerformerDetail container', () => {
  let comp;
  let store;

  beforeEach(() => {
    store = mockStore({
      locale: {
        languages: ['cs'],
      },
      performers: {
        detail: {
          valid: true,
          data: {
            id: 20,
            createdAt: '2017-03-05T00:00:00',
            name: 'lunch',
            text: 'foo',
            lang: 'cs',
            photos: [
              {
                id: 10,
                image: '/images/10.jpg',
              },
            ],
          },
        },
      },
    });
    comp = shallow(<PerformerDetail resourceId="20000-zidu-pod-morem-3154" />, {
      context: { store },
    });
  });

  it('provides list of news', () => {
    expect(comp.dive().dive().find('PerformerDetail')).toHaveProp('performer', {
      id: 20,
      createdAt: '2017-03-05T00:00:00',
      name: 'lunch',
      text: 'foo',
      lang: 'cs',
      photos: [
        {
          id: 10,
          image: '/images/10.jpg',
        },
      ],
      frontImage: '/images/10.jpg',
    });
  });

  it('dispatches news required action on mount', () => {
    comp.dive();
    expect(store.getActions()).toContainEqual(expect.objectContaining({
      type: performerDetailFetch.TRIGGER,
      payload: '20000-zidu-pod-morem-3154',
    }));
  });
});
