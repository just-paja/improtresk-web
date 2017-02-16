import Grid from 'react-bootstrap/lib/Grid';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Container from '../../../src/web/components/container';

describe('Container component', () => {
  it('renders link', () => {
    expect(shallow(<Container>foo</Container>).node).to.eql(
      <div className="container-appContent">
        <Grid>
          foo
        </Grid>
      </div>
    );
  });
});
