import React from 'react';

import { shallow } from 'enzyme';

import WorkshopDetail from '../WorkshopDetail';

describe('Workshop Detail component', () => {
  it('renders link to detail', () => {
    const comp = shallow(
      <WorkshopDetail
        id={12}
        desc="Na workshopu se zaměříme na práci s tělem, nonverbální."
        difficulty="Pro všechny"
        name="Pantomima a fyzické divadlo"
        photos={[]}
        prices={[
          {
            id: 2,
            name: 'Zlevněná',
            takesEffectOn: '2016-01-02',
            endsOn: '2016-01-05',
            price: 1200,
          },
          {
            id: 5,
            name: 'Základní',
            takesEffectOn: '2016-01-05',
            price: 1900,
          },
        ]}
        lectors={[
          {
            id: 5,
            role: 'Hlavní lektor',
            lector: {
              name: 'Vojtěch Svoboda',
              photos: [],
              about: 'Herectví se věnuje odmalička, kdy ztvárnil',
            },
          },
        ]}
      />
    );
    expect(comp.find('PermaLink')).toHaveProp('to', 'workshopDetail');
  });

  it('renders without prices', () => {
    const comp = shallow(
      <WorkshopDetail
        id={12}
        desc="Na workshopu se zaměříme na práci s tělem, nonverbální."
        difficulty="Pro všechny"
        name="Pantomima a fyzické divadlo"
        photos={[]}
        prices={[]}
        lectors={[]}
      />
    );
    expect(comp.find('PriceList')).toHaveLength(0);
  });
});
