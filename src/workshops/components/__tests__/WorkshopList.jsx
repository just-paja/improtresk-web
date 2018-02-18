import React from 'react';

import { shallow } from 'enzyme';

import WorkshopList from '../WorkshopList';

describe('Workshop List component', () => {
  it('renders workshop summary for passed workshops', () => {
    const comp = shallow(
      <WorkshopList
        workshops={[
          {
            id: 12,
            desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.',
            difficulty: 'Pro všechny',
            name: 'Pantomima a fyzické divadlo',
            lectors: [
              {
                name: 'Vojtěch Svoboda',
              },
            ],
          },
        ]}
      />
    );
    expect(comp.find('WorkshopSummary').props()).toMatchObject({
      id: 12,
      desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.',
      difficulty: 'Pro všechny',
      name: 'Pantomima a fyzické divadlo',
      lectors: [
        {
          name: 'Vojtěch Svoboda',
        },
      ],
    });
  });
});
