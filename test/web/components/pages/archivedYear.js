import Helmet from 'react-helmet';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ArchivedYear from '../../../../src/web/components/pages/archivedYear';
import Container from '../../../../src/web/components/container';
import NotFound from '../../../../src/web/components/notFound';
import ObjectList from '../../../../src/web/components/objectList';
import WorkshopSummaryOneLine from '../../../../src/web/components/workshopSummaryOneLine';

describe('Workshop Detail page component', () => {
  it('renders empty when not ready', () => {
    expect(shallow(
      <ArchivedYear
        onDataRequest={() => {}}
        routeParams={{}}
        workshops={[]}
      />
    ).node).to.equal(null);
  });
  it('renders not found on 404', () => {
    expect(shallow(
      <ArchivedYear
        onDataRequest={() => {}}
        routeParams={{}}
        workshops={[]}
        ready
      />
    ).node).to.eql(<NotFound />);
  });
  it('renders year detail', () => {
    expect(shallow(
      <ArchivedYear
        onDataRequest={() => {}}
        routeParams={{}}
        workshops={[]}
        ready
        topic="foo"
        year="2016"
      />
    ).node).to.eql(
      <Container>
        <Helmet
          title="Ročník 2016: foo"
          meta={[
            { property: 'og:title', content: 'Ročník 2016: foo' },
          ]}
        />
        <h1>Ročník 2016<br /><small>foo</small></h1>
        <h2>Workshopy</h2>
        <ObjectList
          Component={WorkshopSummaryOneLine}
          data={[]}
        />
      </Container>
    );
  });
  it('triggers onDataRequest on mount', () => {
    const dataRequestSpy = sinon.spy();
    shallow(
      <ArchivedYear
        onDataRequest={dataRequestSpy}
        routeParams={{
          year: '2016-foo-1',
        }}
        workshops={[]}
        ready
        topic="foo"
        year="2016"
      />
    );

    expect(dataRequestSpy.args).to.eql([
      ['1'],
    ]);
  });
  it('triggers onDataRequest on new props when changed', () => {
    const dataRequestSpy = sinon.spy();
    const comp = shallow(
      <ArchivedYear
        onDataRequest={dataRequestSpy}
        routeParams={{
          year: '2016-foo-1',
        }}
        workshops={[]}
        ready
        topic="foo"
        year="2016"
      />
    );

    comp.setProps({
      routeParams: {
        year: '2015-bar-2',
      },
    });

    expect(dataRequestSpy.args).to.eql([
      ['1'],
      ['2'],
    ]);
  });
});
