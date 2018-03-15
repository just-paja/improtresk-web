import React from 'react';

import { shallow } from 'enzyme';

import WorkshopList from '../WorkshopList';

describe('WorkshopList component', () => {
  it('renders workshop list item', () => {
    const comp = shallow(
      <WorkshopList
        workshops={[
          {
            id: 12,
            desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.',
            difficulty: 'Pro všechny',
            name: 'Pantomima a fyzické divadlo',
            capacityStatus: {},
            lectors: [
              {
                id: 10,
                role: 'Hlavní lektor',
                lector: {
                  id: 11,
                  name: 'Vojtěch Svoboda',
                },
              },
            ],
          },
        ]}
      />
    );
    expect(comp.find('WorkshopListItem')).toHaveProp('workshop', {
      id: 12,
      desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.',
      difficulty: 'Pro všechny',
      name: 'Pantomima a fyzické divadlo',
      capacityStatus: {},
      lectors: [
        {
          id: 10,
          role: 'Hlavní lektor',
          lector: {
            id: 11,
            name: 'Vojtěch Svoboda',
          },
        },
      ],
    });
  });

  it('renders empty message when no workshops are given', () => {
    const comp = shallow(
      <WorkshopList workshops={[]} />
    );
    expect(comp.find('Connect(Message)[name="workshops.empty"]')).toHaveLength(1);
  });
});
