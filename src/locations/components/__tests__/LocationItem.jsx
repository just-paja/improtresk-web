import React from 'react';

import { shallow } from 'enzyme';

import LocationItem from '../LocationItem';

describe('LocationItem component', () => {
  it('renders location name', () => {
    const comp = shallow(
      <LocationItem
        name="DK Milevsko"
        address="Nádražní 10"
        description={[
          {
            id: 1,
            lang: 'cs',
            text: 'Dům kultury',
          },
        ]}
        photos={[
          {
            src: '/images/front.jpg',
          },
        ]}
      />
    );
    expect(comp.find({ children: 'DK Milevsko' })).toHaveLength(1);
  });

  it('renders location address', () => {
    const comp = shallow(
      <LocationItem
        name="DK Milevsko"
        address="Nádražní 10"
        description={[
          {
            id: 1,
            lang: 'cs',
            text: 'Dům kultury',
          },
        ]}
        photos={[
          {
            src: '/images/front.jpg',
          },
        ]}
      />
    );
    expect(comp.find('Address')).toHaveProp('address', 'Nádražní 10');
  });

  it('renders location description', () => {
    const comp = shallow(
      <LocationItem
        name="DK Milevsko"
        address="Nádražní 10"
        description={[
          {
            id: 1,
            lang: 'cs',
            text: 'Dům kultury',
          },
        ]}
        photos={[
          {
            src: '/images/front.jpg',
          },
        ]}
      />
    );
    expect(comp.find('Connect(MultiLingualMarkdown)')).toHaveProp('texts', [
      {
        id: 1,
        lang: 'cs',
        text: 'Dům kultury',
      },
    ]);
  });

  it('renders photo gallery', () => {
    const comp = shallow(
      <LocationItem
        name="DK Milevsko"
        address="Nádražní 10"
        description={[
          {
            id: 1,
            lang: 'cs',
            text: 'Dům kultury',
          },
        ]}
        photos={[
          {
            src: '/images/front.jpg',
          },
        ]}
      />
    );
    expect(comp.find('Gallery')).toHaveProp('photos', [
      {
        src: '/images/front.jpg',
      },
    ]);
  });
});
