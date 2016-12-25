import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import WorkshopDetailPage from '../../../../src/web/components/pages/workshopDetail';
import WorkshopDetail from '../../../../src/web/components/workshopDetail';

describe('Workshop Detail page component', () => {
  it('empty when not ready', () => {
    expect(shallow(
      <WorkshopDetailPage
        onMount={() => {}}
        routeParams={{}}
        tips={[]}
      />
    ).node).to.equal(null);
  });

  it('renders content', () => {
    expect(shallow(
      <WorkshopDetailPage
        onMount={() => {}}
        routeParams={{}}
        workshop={{
          id: 12,
          desc:
            'Na workshopu se zaměříme na práci s tělem, nonverbální herectví a pantomimu. ' +
            'Budeme se věnovat fyzickému tréninku a technikám k ovládnutí svého těla a ' +
            'celkovému propojení se svým tělem na jevišti. S tím souvisí i cvičení na jevištní ' +
            'přítomnost, dech, pohled a temporytmus. Podíváme se také na techniku imaginární ' +
            'pantomimy jako chůze na místě, práce s imaginárním objektem a další. Zkusíme si' +
            'základy nonverbálního herectví, tvorbu divadelní postavy podle jejího fyzična a' +
            'práci s hereckým partnerem...zkrátka uvidíme, co všechno stihneme.',
          difficulty: 'Pro všechny',
          name: 'Pantomima a fyzické divadlo',
          photos: [],
          lector: {
            name: 'Vojtěch Svoboda',
            photos: [],
            about:
              'Herectví se věnuje odmalička, kdy ztvárnil mnoho rolí v amatérských souborech, ' +
              'za které získal řadu cen a ocenění (za herecký výkon Karlínská tříska, Nadělení ' +
              'Brno, cena poroty Loutkářská Chrudim, Held/in Tirol v Rakousku a další). Po studiu ' +
              'na osmiletém gymnáziu zamířil na katedru pantomimy pražské HAMU, kde v roce 2013 ' +
              'absolvoval bakalářský obor (titul BcA.), v současné době pokračuje v navazujícím',
          },
        }}
        ready
      />
    ).node).to.eql(
      <div>
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
          photos={[]}
          lector={{
            name: 'Vojtěch Svoboda',
            photos: [],
            about:
              'Herectví se věnuje odmalička, kdy ztvárnil mnoho rolí v amatérských souborech, ' +
              'za které získal řadu cen a ocenění (za herecký výkon Karlínská tříska, Nadělení ' +
              'Brno, cena poroty Loutkářská Chrudim, Held/in Tirol v Rakousku a další). Po studiu ' +
              'na osmiletém gymnáziu zamířil na katedru pantomimy pražské HAMU, kde v roce 2013 ' +
              'absolvoval bakalářský obor (titul BcA.), v současné době pokračuje v navazujícím',
          }}
        />
      </div>
    );
  });

  it('calls onMount on componentWillMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <WorkshopDetailPage
        onMount={mountSpy}
        routeParams={{
          slug: 'foo',
        }}
        news={[]}
      />
    );

    comp.instance().componentWillMount();
    expect(mountSpy.calledTwice).to.equal(true);
    expect(mountSpy.args).to.eql([
      ['foo'],
      ['foo'],
    ]);
  });

  it('calls onMount on componentWillMount', () => {
    const mountSpy = sinon.spy();
    shallow(
      <WorkshopDetailPage
        onMount={mountSpy}
        routeParams={{}}
        news={[]}
      />
    );

    expect(mountSpy.calledOnce).to.equal(true);
    expect(mountSpy.args).to.eql([
      [null],
    ]);
  });
});