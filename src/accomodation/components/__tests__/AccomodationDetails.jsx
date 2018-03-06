import React from 'react';

import { shallow } from 'enzyme';

import Accomodation from '../AccomodationDetails';

describe('Address component', () => {
  it('renders address given it is available', () => {
    const comp = shallow(
      <Accomodation
        address="Nádražní 846, 399 01 Milevsko"
        available={15}
        capacityStatus={{ assigned: 10, capacity: 20, freeSpots: 5, reserved: 5 }}
        desc="Some long description"
        name="Dům Kultury Milevsko"
        photos={[]}
        price={200}
        translate={msg => msg}
      />
    );
    expect(comp.find('Address')).toHaveProp('address', 'Nádražní 846, 399 01 Milevsko');
  });

  it('renders without address when it is no given', () => {
    const comp = shallow(
      <Accomodation
        available={15}
        capacityStatus={{ assigned: 10, capacity: 20, freeSpots: 5, reserved: 5 }}
        desc="Some long description"
        name="Dům Kultury Milevsko"
        photos={[]}
        price={200}
        translate={msg => msg}
      />
    );
    expect(comp.find('Address')).toHaveLength(0);
  });

  it('renders price', () => {
    const comp = shallow(
      <Accomodation
        address="Nádražní 846, 399 01 Milevsko"
        available={15}
        capacityStatus={{ assigned: 10, capacity: 20, freeSpots: 5, reserved: 5 }}
        desc="Some long description"
        name="Dům Kultury Milevsko"
        photos={[]}
        price={200}
        translate={msg => msg}
      />
    );
    expect(comp.find('Price')).toHaveProp('price', 200);
  });

  it('renders capacity', () => {
    const comp = shallow(
      <Accomodation
        address="Nádražní 846, 399 01 Milevsko"
        available={15}
        capacityStatus={{ assigned: 10, capacity: 20, freeSpots: 5, reserved: 5 }}
        desc="Some long description"
        name="Dům Kultury Milevsko"
        photos={[]}
        price={200}
        translate={msg => msg}
      />
    );
    expect(comp.find('Capacity').props()).toMatchObject({
      assigned: 10,
      capacity: 20,
      freeSpots: 5,
      reserved: 5,
    });
  });

  it('renders markdown description', () => {
    const comp = shallow(
      <Accomodation
        address="Nádražní 846, 399 01 Milevsko"
        available={15}
        capacityStatus={{ assigned: 10, capacity: 20, freeSpots: 5, reserved: 5 }}
        desc="Some long description"
        name="Dům Kultury Milevsko"
        photos={[]}
        price={200}
        translate={msg => msg}
      />
    );
    expect(comp.find('Connect(MultiLingualMarkdown)')).toHaveLength(1);
  });

  it('renders photo gallery', () => {
    const comp = shallow(
      <Accomodation
        address="Nádražní 846, 399 01 Milevsko"
        available={15}
        capacityStatus={{ assigned: 10, capacity: 20, freeSpots: 5, reserved: 5 }}
        desc="Some long description"
        name="Dům Kultury Milevsko"
        photos={[
          {
            caption: 'Some photo',
            height: 480,
            src: 'https://example.com/photos/1',
            width: 640,
          },
        ]}
        price={200}
        translate={msg => msg}
      />
    );
    expect(comp.find('Gallery')).toHaveProp('photos', [
      {
        caption: 'Some photo',
        src: 'https://example.com/photos/1',
        height: 480,
        width: 640,
      },
    ]);
  });
});
