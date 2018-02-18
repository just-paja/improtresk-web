import Helmet from 'react-helmet';
import React from 'react';

import { shallow } from 'enzyme';

import ArchivedYear from '../ArchivedYear';
import Container from '../../../components/Container';
import ObjectList from '../../../components/ObjectList';
import WorkshopSummaryOneLine from '../../../workshops/components/WorkshopSummaryOneLine';

describe('Workshop Detail page component', () => {
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
    ).getElement()).toEqual(
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
          emptyMessage="Bohužel nemáme záznamy"
          extra={{ hideCapacity: true }}
        />
      </Container>
    );
  });
});
