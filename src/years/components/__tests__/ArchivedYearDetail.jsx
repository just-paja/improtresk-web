import React from 'react';

import { shallow } from 'enzyme';

import ArchivedYearDetail from '../../components/ArchivedYearDetail';

describe('ArchivedYearDetail component', () => {
  it('renders page title', () => {
    const comp = shallow(
      <ArchivedYearDetail
        topic="Sladíme se společně"
        translate={msg => msg}
        workshops={[]}
        year="2018"
      />
    );
    expect(comp.find('Connect(HelmetTitle)')).toHaveProp('title', 'years.yearNumber: Sladíme se společně');
  });

  it('renders year number', () => {
    const comp = shallow(
      <ArchivedYearDetail
        topic="Sladíme se společně"
        translate={msg => msg}
        workshops={[]}
        year="2018"
      />
    );
    expect(comp.find({ children: 'years.yearNumber' })).toHaveLength(1);
  });

  it('renders year topic', () => {
    const comp = shallow(
      <ArchivedYearDetail
        topic="Sladíme se společně"
        translate={msg => msg}
        workshops={[]}
        year="2018"
      />
    );
    expect(comp.find({ children: 'Sladíme se společně' })).toHaveLength(1);
  });

  it('renders archived workshop name', () => {
    const comp = shallow(
      <ArchivedYearDetail
        topic="Sladíme se společně"
        translate={msg => msg}
        workshops={[
          {
            id: 15,
            name: 'Test Workshop',
            photos: [],
          },
        ]}
        year="2018"
      />
    );
    expect(comp.find({ children: 'Test Workshop' })).toHaveLength(1);
  });

  it('renders archived workshop photos gallery', () => {
    const comp = shallow(
      <ArchivedYearDetail
        topic="Sladíme se společně"
        translate={msg => msg}
        workshops={[
          {
            id: 15,
            name: 'Test Workshop',
            photos: [
              {
                id: 20,
                image: '/images/10.jpg',
              },
            ],
          },
        ]}
        year="2018"
      />
    );
    expect(comp.find('Gallery')).toHaveProp('photos', [
      {
        id: 20,
        image: '/images/10.jpg',
      },
    ]);
  });
});
