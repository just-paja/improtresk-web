import Helmet from 'react-helmet';
import React from 'react';

import { shallow } from 'enzyme';

import Container from '../../../components/Container';
import WorkshopDetailPage from '../WorkshopDetailPage';
import WorkshopDetail from '../../../workshops/components/WorkshopDetail';

describe('Workshop Detail page component', () => {
  it('renders content', () => {
    expect(shallow(
      <WorkshopDetailPage
        onMount={() => {}}
        routeParams={{}}
        workshop={{
          id: 12,
          desc: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu',
          difficulty: 'Pro všechny',
          name: 'Pantomima a fyzické divadlo',
          photos: [],
          lectors: [
            {
              name: 'Vojtěch Svoboda',
              photos: [],
              about: 'Herectví se věnuje odmalička, kdy ztvárnil mnoho rolí v amatérských souborech.',
              role: 'Hlavní lektor',
            },
          ],
          prices: [],
        }}
        ready
      />
    ).getElement()).toEqual(
      <Container>
        <Helmet
          title="Pantomima a fyzické divadlo"
          meta={[
            {
              property: 'og:title',
              content: 'Pantomima a fyzické divadlo',
            },
            {
              property: 'og:description',
              content: 'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu...',
            },
          ]}
        />
        <WorkshopDetail
          id={12}
          desc="Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu"
          difficulty="Pro všechny"
          name="Pantomima a fyzické divadlo"
          photos={[]}
          prices={[]}
          lectors={[
            {
              name: 'Vojtěch Svoboda',
              photos: [],
              about: 'Herectví se věnuje odmalička, kdy ztvárnil mnoho rolí v amatérských souborech.',
              role: 'Hlavní lektor',
            },
          ]}
        />
      </Container>
    );
  });
});
