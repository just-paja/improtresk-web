import React from 'react';

import { Button } from 'react-bootstrap';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LectorListSummary from '../../../src/web/components/lectorListSummary';
import PermaLink from '../../../src/web/components/permaLink';
import Prop from '../../../src/web/components/prop';
import WorkshopSummary from '../../../src/web/components/workshopSummary';

describe('Workshop Summary component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopSummary
        id={12}
        desc={
          'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu. ' +
          'Budeme se věnovat fyzickému tréninku a technikám k ovládnutí svého těla a ' +
          'celkovému propojení se svým tělem na jevišti. S tím souvisí i cvičení na jevištní ' +
          'přítomnost, dech, pohled a temporytmus. Podíváme se také na techniku imaginární ' +
          'pantomimy jako chůze na místě, práce s imaginárním objektem a další. Zkusíme si' +
          'základy nonverbálního herectví, tvorbu divadelní postavy podle jejího fyzična a' +
          'práci s hereckým partnerem...zkrátka uvidíme, co všechno stihneme.'}
        difficulty="Pro všechny"
        name="Pantomima a fyzické divadlo"
        lectors={[
          {
            id: 23,
            lector: { name: 'Vojtěch Svoboda' },
            role: 'Hlavní lektor',
          },
          {
            id: 98,
            lector: { name: 'Martin Vlk' },
            role: 'Doprovodný lektor',
          },
        ]}
      />
    ).node).to.eql(
      <div>
        <h2>
          <PermaLink id={12} title="Pantomima a fyzické divadlo" to="workshops:item">
            Pantomima a fyzické divadlo
          </PermaLink>
        </h2>

        <ul className="list-unstyled">
          <LectorListSummary
            name="Vojtěch Svoboda"
            position="Hlavní lektor"
          />
          <LectorListSummary
            name="Martin Vlk"
            position="Doprovodný lektor"
          />
          <Prop icon="hand-rock-o" label="Náročnost">Pro všechny</Prop>
        </ul>

        <div>
          Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.
          Budeme se věnovat fyzickému tréninku a technikám k ovládnutí svého těla a
          celkovému propojení se svým tělem na jevišti. S tím souvisí i cvičení na
          jevištní přítomnost, dech, pohl...
        </div>

        <PermaLink id={12} title="Pantomima a fyzické divadlo" to="workshops:item">
          <Button bsSize="small">Více informací</Button>
        </PermaLink>
      </div>
    );
  });
});
