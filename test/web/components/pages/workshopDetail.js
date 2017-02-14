import Helmet from 'react-helmet';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Container from '../../../../src/web/components/container';
import WorkshopDetailPage from '../../../../src/web/components/pages/workshopDetail';
import WorkshopDetail from '../../../../src/web/components/workshopDetail';

describe('Workshop Detail page component', () => {
  it('empty when not ready', () => {
    expect(shallow(
      <WorkshopDetailPage
        onMount={() => {}}
        routeParams={{}}
        workshop={{}}
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
        }}
        ready
      />
    ).node).to.eql(
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

  it('calls onMount on componentWillMount with slug', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <WorkshopDetailPage
        onMount={mountSpy}
        routeParams={{
          slug: 'foo',
        }}
        workshop={{}}
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
        workshop={{}}
      />
    );

    expect(mountSpy.calledOnce).to.equal(true);
    expect(mountSpy.args).to.eql([
      [null],
    ]);
  });
});
