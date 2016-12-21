import FontAwesome from 'react-fontawesome';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import PermaLink from '../../../src/web/components/permaLink';
import WorkshopDetail from '../../../src/web/components/workshopDetail';

describe('Workshop Detail component', () => {
  it('renders', () => {
    expect(shallow(
      <WorkshopDetail
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
        lector={{
          name: 'Vojtěch Svoboda',
          about:
            'Herectví se věnuje odmalička, kdy ztvárnil mnoho rolí v amatérských souborech, ' +
            'za které získal řadu cen a ocenění (za herecký výkon Karlínská tříska, Nadělení ' +
            'Brno, cena poroty Loutkářská Chrudim, Held/in Tirol v Rakousku a další). Po studiu ' +
            'na osmiletém gymnáziu zamířil na katedru pantomimy pražské HAMU, kde v roce 2013 ' +
            'absolvoval bakalářský obor (titul BcA.), v současné době pokračuje v navazujícím',
        }}
      />
    ).node).to.eql(
      <div>
        <h1>
          <PermaLink id={12} title="Pantomima a fyzické divadlo" to="workshops:item">
            Pantomima a fyzické divadlo
          </PermaLink>
        </h1>

        <ul className="list-unstyled">
          <li>
            <FontAwesome name="user" />{' '}
            Vojtěch Svoboda
          </li>
          <li>
            <FontAwesome name="hand-rock-o" />{' '}
            Pro všechny
          </li>
        </ul>

        <div>
          Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu.
          Budeme se věnovat fyzickému tréninku a technikám k ovládnutí svého těla a
          celkovému propojení se svým tělem na jevišti. S tím souvisí i cvičení na jevištní
          přítomnost, dech, pohled a temporytmus. Podíváme se také na techniku imaginární
          pantomimy jako chůze na místě, práce s imaginárním objektem a další. Zkusíme
          sizáklady nonverbálního herectví, tvorbu divadelní postavy podle jejího fyzična
          apráci s hereckým partnerem...zkrátka uvidíme, co všechno stihneme.
        </div>

        <h2>Vojtěch Svoboda</h2>
        <div>
          Herectví se věnuje odmalička, kdy ztvárnil mnoho rolí v amatérských souborech,
          za které získal řadu cen a ocenění (za herecký výkon Karlínská tříska, Nadělení
          Brno, cena poroty Loutkářská Chrudim, Held/in Tirol v Rakousku a další). Po
          studiu na osmiletém gymnáziu zamířil na katedru pantomimy pražské HAMU, kde v
          roce 2013 absolvoval bakalářský obor (titul BcA.), v současné době pokračuje v
          navazujícím
        </div>
      </div>
    );
  });
});
