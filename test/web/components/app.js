import React from 'react';

import { expect } from 'chai';
import { Grid } from 'react-bootstrap';
import { shallow } from 'enzyme';

import App from '../../../src/web/components/app';
import Navigation from '../../../src/web/components/navigation';

describe('App component', () => {
  it('renders layout and content', () => {
    expect(shallow(
      <App>
        <div>foo</div>
      </App>
    ).node).to.eql(
      <Grid className="improtresk-app">
        <Navigation />
        <div>foo</div>
      </Grid>
    );
  });
});
