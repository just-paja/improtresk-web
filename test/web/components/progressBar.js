import BootstrapProgressBar from 'react-bootstrap/lib/ProgressBar';
import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import ProgressBar from '../../../src/web/components/progressBar';

describe('ProgressBar component', () => {
  it('renders as loading', () => {
    expect(shallow(
      <ProgressBar activeRequests={10} />
    ).node).to.eql(
      <BootstrapProgressBar
        active
        className="progressBar-appProgressBar"
        now={100 / 11}
        striped={false}
      />
    );
  });
  it('renders as idle', () => {
    expect(shallow(
      <ProgressBar activeRequests={0} />
    ).node).to.eql(
      <BootstrapProgressBar
        active={false}
        className="progressBar-appProgressBar"
        now={100}
        striped={false}
      />
    );
  });
});
