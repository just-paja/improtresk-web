import Grid from 'react-bootstrap/lib/Grid';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Workshops from '../../../../src/web/components/pages/workshops';
import WorkshopList from '../../../../src/web/components/workshopList';

describe('Workshops page component', () => {
  it('empty when not ready', () => {
    expect(shallow(
      <Workshops
        onMount={() => {}}
        workshops={[]}
      />
    ).node).to.equal(null);
  });

  it('renders content', () => {
    expect(shallow(
      <Workshops
        onMount={() => {}}
        routeParams={{}}
        workshops={[
          {
            id: 12,
            desc: 'foo',
          },
          {
            id: 15,
            desc: 'bar',
          },
        ]}
        ready
      />
    ).node).to.eql(
      <Grid>
        <h1>Workshopy</h1>
        <WorkshopList
          workshops={[
            {
              id: 12,
              desc: 'foo',
            },
            {
              id: 15,
              desc: 'bar',
            },
          ]}
        />
      </Grid>
    );
  });

  it('calls onMount on componentWillMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <Workshops
        onMount={mountSpy}
        routeParams={{
          slug: 'foo',
        }}
        news={[]}
      />
    );

    comp.instance().componentWillMount();
    expect(mountSpy.calledTwice).to.equal(true);
  });
});
