import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { Grid } from 'react-bootstrap';
import { shallow } from 'enzyme';

import App from '../../../src/web/components/app';
import Navigation from '../../../src/web/components/navigation';

describe('App component', () => {
  it('renders layout and content', () => {
    expect(shallow(
      <App
        onMount={() => {}}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      >
        <div>foo</div>
      </App>
    ).node).to.eql(
      <Grid className="improtresk-app">
        <Navigation
          years={[
            { year: '2016', topic: 'Ovce' },
          ]}
        />
        <div>foo</div>
      </Grid>
    );
  });

  it('calls onMount on componentDidMount', () => {
    const mountSpy = sinon.spy();
    const comp = shallow(
      <App
        onMount={mountSpy}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      />
    );

    comp.instance().componentWillMount();
    expect(mountSpy.calledTwice).to.equal(true);
  });
});
