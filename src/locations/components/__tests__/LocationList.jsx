import React from 'react';

import { shallow } from 'enzyme';

import LocationItem from '../LocationItem';
import LocationList from '../LocationList';

describe('LocationList component', () => {
  it('passes LocationItem to object list', () => {
    const comp = shallow(
      <LocationList
        locationList={[
          {
            name: 'DK Milevsko',
            address: 'Nádražní 10',
            description: [
              {
                id: 1,
                lang: 'cs',
                text: 'Dům kultury',
              },
            ],
            photos: [
              {
                src: '/images/front.jpg',
              },
            ],
          },
        ]}
      />
    );
    expect(comp.find('ObjectList')).toHaveProp('Component', LocationItem);
  });

  it('passes list of locations to object list', () => {
    const comp = shallow(
      <LocationList
        locationList={[
          {
            name: 'DK Milevsko',
            address: 'Nádražní 10',
            description: [
              {
                id: 1,
                lang: 'cs',
                text: 'Dům kultury',
              },
            ],
            photos: [
              {
                src: '/images/front.jpg',
              },
            ],
          },
        ]}
      />
    );
    expect(comp.find('ObjectList')).toHaveProp('data', [
      {
        name: 'DK Milevsko',
        address: 'Nádražní 10',
        description: [
          {
            id: 1,
            lang: 'cs',
            text: 'Dům kultury',
          },
        ],
        photos: [
          {
            src: '/images/front.jpg',
          },
        ],
      },
    ]);
  });
});
